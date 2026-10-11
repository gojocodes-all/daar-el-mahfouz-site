export function initializeReveal(documentObject, windowObject) {
  const elements = [...documentObject.querySelectorAll('.reveal')];
  const reduceMotion = windowObject.matchMedia?.(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion || typeof windowObject.IntersectionObserver !== 'function') {
    elements.forEach((element) => element.classList.add('visible'));
    return () => {};
  }

  const observer = new windowObject.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
