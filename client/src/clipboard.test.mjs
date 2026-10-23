import assert from 'node:assert/strict';
import test from 'node:test';

import {
  COPY_FEEDBACK_DURATION_MS,
  createClipboardController,
  getCopyFeedbackText
} from './clipboard.mjs';

function createTimerHarness() {
  let nextId = 1;
  const tasks = new Map();
  const cleared = [];

  return {
    cleared,
    tasks,
    setTimer(callback, delay) {
      const id = nextId;
      nextId += 1;
      tasks.set(id, { callback, delay });
      return id;
    },
    clearTimer(id) {
      cleared.push(id);
      tasks.delete(id);
    },
    run(id) {
      const task = tasks.get(id);
      assert.ok(task, `Timer ${id} should exist`);
      tasks.delete(id);
      task.callback();
    }
  };
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, reject, resolve };
}

test('copy writes the exact text and resets successful feedback', async () => {
  const writes = [];
  const feedback = [];
  const timers = createTimerHarness();
  const controller = createClipboardController({
    clipboard: {
      async writeText(value) {
        writes.push(value);
      }
    },
    onFeedback: (value) => feedback.push(value),
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer
  });

  const status = await controller.copy('payment', 'Bank\nName\n1234');

  assert.equal(status, 'copied');
  assert.deepEqual(writes, ['Bank\nName\n1234']);
  assert.deepEqual(feedback, [null, { label: 'payment', status: 'copied' }]);
  assert.equal(timers.tasks.size, 1);

  const [timerId, timer] = timers.tasks.entries().next().value;
  assert.equal(timer.delay, COPY_FEEDBACK_DURATION_MS);

  timers.run(timerId);
  assert.deepEqual(feedback, [null, { label: 'payment', status: 'copied' }, null]);
});

test('copy reports a visible failure when the Clipboard API is unavailable or rejects', async () => {
  for (const clipboard of [
    undefined,
    {
      async writeText() {
        throw new Error('Clipboard permission denied');
      }
    }
  ]) {
    const feedback = [];
    const timers = createTimerHarness();
    const controller = createClipboardController({
      clipboard,
      onFeedback: (value) => feedback.push(value),
      setTimer: timers.setTimer,
      clearTimer: timers.clearTimer
    });

    const status = await controller.copy('donation', 'details');

    assert.equal(status, 'failed');
    assert.deepEqual(feedback, [null, { label: 'donation', status: 'failed' }]);
    assert.equal(timers.tasks.size, 1);
    controller.dispose();
  }
});

test('only the latest overlapping copy attempt can publish feedback', async () => {
  const paymentWrite = deferred();
  const donationWrite = deferred();
  const feedback = [];
  const timers = createTimerHarness();
  const controller = createClipboardController({
    clipboard: {
      writeText(value) {
        return value === 'payment details' ? paymentWrite.promise : donationWrite.promise;
      }
    },
    onFeedback: (value) => feedback.push(value),
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer
  });

  const paymentCopy = controller.copy('payment', 'payment details');
  const donationCopy = controller.copy('donation', 'donation details');

  donationWrite.resolve();
  assert.equal(await donationCopy, 'copied');

  paymentWrite.resolve();
  assert.equal(await paymentCopy, 'copied');

  assert.deepEqual(feedback, [
    null,
    null,
    { label: 'donation', status: 'copied' }
  ]);
  assert.equal(timers.tasks.size, 1);
});

test('dispose cancels scheduled feedback and ignores a pending completion', async () => {
  const pendingWrite = deferred();
  const feedback = [];
  const timers = createTimerHarness();
  let callCount = 0;
  const controller = createClipboardController({
    clipboard: {
      writeText() {
        callCount += 1;
        return callCount === 1 ? Promise.resolve() : pendingWrite.promise;
      }
    },
    onFeedback: (value) => feedback.push(value),
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer
  });

  assert.equal(await controller.copy('payment', 'first'), 'copied');
  const [firstTimerId] = timers.tasks.keys();

  const pendingCopy = controller.copy('donation', 'second');
  assert.deepEqual(timers.cleared, [firstTimerId]);

  controller.dispose();
  pendingWrite.resolve();

  assert.equal(await pendingCopy, 'copied');
  assert.equal(timers.tasks.size, 0);
  assert.deepEqual(feedback, [
    null,
    { label: 'payment', status: 'copied' },
    null
  ]);
});

test('feedback text belongs only to the matching control', () => {
  const copied = { label: 'payment', status: 'copied' };
  const failed = { label: 'donation', status: 'failed' };

  assert.equal(getCopyFeedbackText(null, 'payment', 'Copy payment details'), 'Copy payment details');
  assert.equal(getCopyFeedbackText(copied, 'donation', 'Copy donation details'), 'Copy donation details');
  assert.equal(getCopyFeedbackText(copied, 'payment', 'Copy payment details'), 'Copied');
  assert.equal(
    getCopyFeedbackText(failed, 'donation', 'Copy donation details'),
    'Copy failed — select details manually'
  );
});
