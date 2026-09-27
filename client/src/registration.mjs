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

export function buildRegistrationMessage(form) {
  return `Assalamu Alaikum. I would like to register/enquire for Daar El-Mahfouz classes.\n\nName: ${form.name}\nPhone: ${form.phone}\nLearner category: ${form.category}\nProgramme: ${form.programme}\nCurrent level: ${form.level}\nPreferred mode: ${form.mode}\nPreferred schedule: ${form.schedule}\nExam target: ${form.exam}\nExtra message: ${form.message || 'None'}\n\nPlease guide me on the next steps.`;
}

export function buildRegistrationUrl(form) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildRegistrationMessage(form))}`;
}
