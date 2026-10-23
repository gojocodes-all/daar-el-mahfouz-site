export const COPY_FEEDBACK_DURATION_MS = 1800;

const FEEDBACK_TEXT = {
  copied: 'Copied',
  failed: 'Copy failed — select details manually'
};

export function getCopyFeedbackText(feedback, label, idleText) {
  if (feedback?.label !== label) {
    return idleText;
  }

  return FEEDBACK_TEXT[feedback.status] ?? idleText;
}

export function createClipboardController({
  clipboard,
  onFeedback,
  setTimer = setTimeout,
  clearTimer = clearTimeout,
  duration = COPY_FEEDBACK_DURATION_MS
}) {
  let activeRequest = 0;
  let resetTimer = null;
  let disposed = false;

  const cancelReset = () => {
    if (resetTimer === null) {
      return;
    }

    clearTimer(resetTimer);
    resetTimer = null;
  };

  return {
    async copy(label, value) {
      if (disposed) {
        return 'failed';
      }

      const requestId = ++activeRequest;
      cancelReset();
      onFeedback(null);

      let status = 'failed';

      if (typeof clipboard?.writeText === 'function') {
        try {
          await clipboard.writeText(value);
          status = 'copied';
        } catch {
          // The details remain visible so the user can copy them manually.
        }
      }

      if (disposed || requestId !== activeRequest) {
        return status;
      }

      onFeedback({ label, status });
      resetTimer = setTimer(() => {
        resetTimer = null;

        if (!disposed && requestId === activeRequest) {
          onFeedback(null);
        }
      }, duration);

      return status;
    },

    dispose() {
      disposed = true;
      activeRequest += 1;
      cancelReset();
    }
  };
}
