export function createEscapeKeyHandler({ closeMenu, restoreFocus }) {
  return (event) => {
    if (event.key !== 'Escape') return;

    closeMenu();
    restoreFocus();
  };
}
