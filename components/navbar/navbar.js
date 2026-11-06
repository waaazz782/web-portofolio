/**
 * NAVBAR COMPONENT LOGIC
 */
export function initNavbar() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (typeof window.showToast === 'function') {
        window.showToast('Cosmic Ambient Focus Mode: Active');
      }
    });
  }

  const cvBtn = document.getElementById('downloadCvBtn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Downloading Dewa_Febrian_CV.pdf (Profile Preview)...');
      }
    });
  }
}
