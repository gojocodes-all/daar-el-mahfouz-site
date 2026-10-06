export const WHATSAPP_NUMBER = '2348068012244';

export function createInitialRegistrationForm() {
  return {
    name: '',
    phone: '',
    category: 'Children',
    programme: 'Qur’an Studies',
    level: 'Beginner',
    mode: 'Live Online Classes',
    schedule: 'Friday 8:00 p.m. – 10:00 p.m.',
    exam: 'Not exam-focused',
    message: ''
  };
}

function normalizeRegistrationForm(form) {
  return Object.fromEntries(
    Object.entries(form).map(([field, value]) => [
      field,
      typeof value === 'string' ? value.trim() : value
    ])
  );
}

export function prepareRegistrationForm(form) {
  const normalizedForm = normalizeRegistrationForm(form);

  if (!normalizedForm.name) {
    return {
      form: normalizedForm,
      error: { field: 'name', message: 'Please enter your full name.' }
    };
  }

  if (!normalizedForm.phone) {
    return {
      form: normalizedForm,
      error: { field: 'phone', message: 'Please enter your phone number.' }
    };
  }

  return { form: normalizedForm, error: null };
}

export function buildRegistrationMessage(form) {
  const normalizedForm = normalizeRegistrationForm(form);

  return `Assalamu Alaikum. I would like to register/enquire for Daar El-Mahfouz classes.\n\nName: ${normalizedForm.name}\nPhone: ${normalizedForm.phone}\nLearner category: ${normalizedForm.category}\nProgramme: ${normalizedForm.programme}\nCurrent level: ${normalizedForm.level}\nPreferred mode: ${normalizedForm.mode}\nPreferred schedule: ${normalizedForm.schedule}\nExam target: ${normalizedForm.exam}\nExtra message: ${normalizedForm.message || 'None'}\n\nPlease guide me on the next steps.`;
}

export function buildRegistrationUrl(form) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildRegistrationMessage(form))}`;
}
