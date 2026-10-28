import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { createEscapeKeyHandler } from './navigation.mjs';

const appSource = fs.readFileSync(new URL('./App.jsx', import.meta.url), 'utf8');

test('mobile menu exposes its controlled navigation and current state', () => {
  assert.match(appSource, /aria-controls="primary-navigation"/);
  assert.match(appSource, /aria-expanded=\{menuOpen\}/);
  assert.match(appSource, /<nav id="primary-navigation"/);
  assert.match(
    appSource,
    /aria-label=\{menuOpen \? 'Close navigation menu' : 'Open navigation menu'\}/
  );
});

test('Escape closes the menu and restores focus without handling other keys', () => {
  let closeCount = 0;
  let focusCount = 0;
  const handleKey = createEscapeKeyHandler({
    closeMenu: () => {
      closeCount += 1;
    },
    restoreFocus: () => {
      focusCount += 1;
    }
  });

  handleKey({ key: 'Enter' });
  assert.equal(closeCount, 0);
  assert.equal(focusCount, 0);

  handleKey({ key: 'Escape' });
  assert.equal(closeCount, 1);
  assert.equal(focusCount, 1);
});
