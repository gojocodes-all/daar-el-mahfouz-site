import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildRegistrationMessage,
  buildRegistrationUrl,
  createInitialRegistrationForm,
  WHATSAPP_NUMBER
} from './registration.mjs';

test('creates an independent form state with the documented defaults', () => {
  const first = createInitialRegistrationForm();
  const second = createInitialRegistrationForm();

  assert.deepEqual(first, {
    name: '',
    phone: '',
    category: 'Children',
    programme: 'Qur’an Studies',
    level: 'Beginner',
    mode: 'Live Online Classes',
    schedule: 'Friday 8:00 p.m. – 10:00 p.m.',
    exam: 'Not exam-focused',
    message: ''
  });
  assert.notStrictEqual(first, second);
});

test('builds the complete enquiry message and supplies the empty-message fallback', () => {
  const form = {
    ...createInitialRegistrationForm(),
    name: 'Amina Yusuf',
    phone: '08000000000',
    category: 'Adults',
    programme: 'Arabic Language',
    level: 'Intermediate',
    mode: 'Physical Classes',
    schedule: 'I need a special arrangement',
    exam: 'WAEC Arabic'
  };

  assert.equal(
    buildRegistrationMessage(form),
    'Assalamu Alaikum. I would like to register/enquire for Daar El-Mahfouz classes.\n\nName: Amina Yusuf\nPhone: 08000000000\nLearner category: Adults\nProgramme: Arabic Language\nCurrent level: Intermediate\nPreferred mode: Physical Classes\nPreferred schedule: I need a special arrangement\nExam target: WAEC Arabic\nExtra message: None\n\nPlease guide me on the next steps.'
  );
});

test('preserves a supplied extra message', () => {
  const form = {
    ...createInitialRegistrationForm(),
    message: 'Please share the next available class date.'
  };

  assert.match(
    buildRegistrationMessage(form),
    /Extra message: Please share the next available class date\./
  );
});

test('creates an encoded WhatsApp URL for the configured institution number', () => {
  const form = {
    ...createInitialRegistrationForm(),
    name: 'Maryam & Zaynab',
    message: 'Interested in Qur’an Studies.'
  };
  const url = new URL(buildRegistrationUrl(form));

  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${WHATSAPP_NUMBER}`);
  assert.equal(url.searchParams.get('text'), buildRegistrationMessage(form));
});
