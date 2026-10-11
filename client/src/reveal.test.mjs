import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeReveal } from './reveal.mjs';

function createElement() {
  const classes = new Set();

  return {
    classList: {
      add(value) {
        classes.add(value);
      },
      contains(value) {
        return classes.has(value);
      }
    }
  };
}

function createDocument(elements) {
  return {
    querySelectorAll(selector) {
      assert.equal(selector, '.reveal');
      return elements;
    }
  };
}

test('reveals every section immediately when reduced motion is requested', () => {
  const elements = [createElement(), createElement()];
  let observerCreated = false;
  const windowObject = {
    matchMedia: () => ({ matches: true }),
    IntersectionObserver: class {
      constructor() {
        observerCreated = true;
      }
    }
  };

  initializeReveal(createDocument(elements), windowObject);

  assert.equal(observerCreated, false);
  assert.equal(elements.every((element) => element.classList.contains('visible')), true);
});

test('keeps content visible when IntersectionObserver is unavailable', () => {
  const elements = [createElement(), createElement()];

  initializeReveal(createDocument(elements), {
    matchMedia: () => ({ matches: false })
  });

  assert.equal(elements.every((element) => element.classList.contains('visible')), true);
});

test('observes, reveals and releases sections on the animated path', () => {
  const elements = [createElement(), createElement()];
  const observed = [];
  const unobserved = [];
  let callback;
  let disconnected = false;

  class FakeIntersectionObserver {
    constructor(observerCallback, options) {
      callback = observerCallback;
      assert.deepEqual(options, { threshold: 0.12 });
    }

    observe(element) {
      observed.push(element);
    }

    unobserve(element) {
      unobserved.push(element);
    }

    disconnect() {
      disconnected = true;
    }
  }

  const cleanup = initializeReveal(createDocument(elements), {
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: FakeIntersectionObserver
  });

  assert.deepEqual(observed, elements);
  callback([
    { isIntersecting: true, target: elements[0] },
    { isIntersecting: false, target: elements[1] }
  ]);
  assert.equal(elements[0].classList.contains('visible'), true);
  assert.equal(elements[1].classList.contains('visible'), false);
  assert.deepEqual(unobserved, [elements[0]]);

  cleanup();
  assert.equal(disconnected, true);
});
