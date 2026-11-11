import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const appSource = fs.readFileSync(new URL('./App.jsx', import.meta.url), 'utf8');
const styleSource = fs.readFileSync(new URL('./style.css', import.meta.url), 'utf8');

function findImageTags(sourceName) {
  const pattern = new RegExp(`<img\\b[^>]*\\bsrc=\\{${sourceName}\\}[^>]*\\/>`, 'g');
  return [...appSource.matchAll(pattern)].map(([tag]) => tag);
}

function assertDimensions(tag, width, height) {
  assert.match(tag, new RegExp(`\\bwidth=\\{${width}\\}`));
  assert.match(tag, new RegExp(`\\bheight=\\{${height}\\}`));
}

test('every rendered image reserves its intrinsic aspect ratio', () => {
  const logoTags = findImageTags('logo');
  const heroTags = findImageTags('flyerTwo');
  const classFlyerTags = findImageTags('flyerOne');
  const contactTags = findImageTags('contactCard');

  assert.equal(logoTags.length, 4);
  assert.equal(heroTags.length, 1);
  assert.equal(classFlyerTags.length, 1);
  assert.equal(contactTags.length, 1);

  logoTags.forEach((tag) => assertDimensions(tag, 533, 471));
  assertDimensions(heroTags[0], 1536, 1536);
  assertDimensions(classFlyerTags[0], 1536, 1536);
  assertDimensions(contactTags[0], 1536, 903);
  assert.match(styleSource, /img\s*\{[^}]*\bheight:\s*auto;/s);
});

test('defers unique below-the-fold artwork without delaying the hero flyer', () => {
  const [heroTag] = findImageTags('flyerTwo');
  const belowFoldTags = [
    ...findImageTags('flyerOne'),
    ...findImageTags('contactCard')
  ];

  assert.doesNotMatch(heroTag, /\bloading="lazy"/);
  assert.equal(belowFoldTags.length, 2);

  belowFoldTags.forEach((tag) => {
    assert.match(tag, /\bloading="lazy"/);
    assert.match(tag, /\bdecoding="async"/);
  });
});
