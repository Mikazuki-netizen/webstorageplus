// StoragePlus Basic - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Phone Mockup Screen Switcher ---
  const screenDashboard = document.getElementById('screen-dashboard');
  const screenGallery = document.getElementById('screen-gallery');
  const screenPin = document.getElementById('screen-pin');
  const screenBrowser = document.getElementById('screen-browser');

  const screens = {
    dashboard: screenDashboard,
    gallery: screenGallery,
    pin: screenPin,
    browser: screenBrowser
  };

  const tabButtons = document.querySelectorAll('.feature-tab-btn');

  function switchMockupScreen(targetKey) {
    Object.entries(screens).forEach(([key, el]) => {
      if (el) {
        if (key === targetKey) {
          el.classList.remove('hidden');
          el.classList.add('animate-fadeIn');
        } else {
          el.classList.add('hidden');
          el.classList.remove('animate-fadeIn');
        }
      }
    });

    tabButtons.forEach(btn => {
      const tabKey = btn.getAttribute('data-tab');
      if (tabKey === targetKey) {
        btn.classList.add('active', 'border-blue-500', 'bg-blue-900/30');
        btn.classList.remove('border-slate-800', 'bg-slate-900/50');
      } else {
        btn.classList.remove('active', 'border-blue-500', 'bg-blue-900/30');
        btn.classList.add('border-slate-800', 'bg-slate-900/50');
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      if (target) switchMockupScreen(target);
    });
  });

  // --- Interactive Mockup: PIN Lock Screen ---
  let enteredPin = "";
  const pinDots = document.querySelectorAll('.pin-dot');
  const pinKeys = document.querySelectorAll('.pin-key');
  const pinStatusText = document.getElementById('pin-status-text');

  function updatePinDisplay() {
    pinDots.forEach((dot, index) => {
      if (index < enteredPin.length) {
        dot.classList.add('bg-blue-400', 'scale-125');
        dot.classList.remove('border-slate-600', 'bg-slate-800');
      } else {
        dot.classList.remove('bg-blue-400', 'scale-125');
        dot.classList.add('border-slate-600', 'bg-slate-800');
      }
    });

    if (enteredPin.length === 6) {
      if (enteredPin === "123456" || enteredPin === "789012" || enteredPin.length === 6) {
        if (pinStatusText) {
          pinStatusText.textContent = "PIN Valid! Membuka Dashboard...";
          pinStatusText.className = "text-xs font-medium text-emerald-400 mt-2 text-center";
        }
        setTimeout(() => {
          switchMockupScreen('dashboard');
          enteredPin = "";
          updatePinDisplay();
          if (pinStatusText) {
            pinStatusText.textContent = "Ketik 6 digit PIN keamanan";
            pinStatusText.className = "text-xs font-medium text-slate-400 mt-2 text-center";
          }
        }, 600);
      }
    }
  }

  pinKeys.forEach(key => {
    key.addEventListener('click', () => {
      const val = key.getAttribute('data-key');
      if (val === 'del') {
        if (enteredPin.length > 0) {
          enteredPin = enteredPin.slice(0, -1);
          updatePinDisplay();
        }
      } else if (val && enteredPin.length < 6) {
        enteredPin += val;
        updatePinDisplay();
      }
    });
  });

  // --- Interactive Mockup: Auto-Backup Toggle ---
  const autoBackupToggle = document.getElementById('mockup-autobackup-toggle');
  const autoBackupThumb = document.getElementById('mockup-autobackup-thumb');
  const autoBackupBadge = document.getElementById('mockup-autobackup-badge');

  if (autoBackupToggle && autoBackupThumb && autoBackupBadge) {
    let isBackupActive = true;
    autoBackupToggle.addEventListener('click', () => {
      isBackupActive = !isBackupActive;
      if (isBackupActive) {
        autoBackupToggle.classList.add('bg-blue-600');
        autoBackupToggle.classList.remove('bg-slate-700');
        autoBackupThumb.classList.add('translate-x-5');
        autoBackupThumb.classList.remove('translate-x-0');
        autoBackupBadge.textContent = "Aktif (Latar Belakang)";
        autoBackupBadge.className = "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      } else {
        autoBackupToggle.classList.remove('bg-blue-600');
        autoBackupToggle.classList.add('bg-slate-700');
        autoBackupThumb.classList.remove('translate-x-5');
        autoBackupThumb.classList.add('translate-x-0');
        autoBackupBadge.textContent = "Dijeda";
        autoBackupBadge.className = "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30";
      }
    });
  }

  // --- Copy to Clipboard buttons ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetText = btn.getAttribute('data-copy');
      if (targetText) {
        navigator.clipboard.writeText(targetText).then(() => {
          const originalContent = btn.innerHTML;
          btn.innerHTML = `<span class="text-xs text-emerald-400 font-medium">Tersalin!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalContent;
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        });
      }
    });
  });

  // --- OEM Guide Selector ---
  const oemButtons = document.querySelectorAll('.oem-tab-btn');
  const oemPanels = document.querySelectorAll('.oem-guide-panel');

  oemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const oem = btn.getAttribute('data-oem');
      oemButtons.forEach(b => {
        if (b === btn) {
          b.classList.add('bg-blue-600', 'text-white');
          b.classList.remove('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
        } else {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
        }
      });

      oemPanels.forEach(panel => {
        if (panel.id === `oem-${oem}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        // close all
        faqItems.forEach(otherItem => {
          const oc = otherItem.querySelector('.faq-content');
          const oi = otherItem.querySelector('.faq-icon');
          if (oc) oc.classList.add('hidden');
          if (oi) oi.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // --- Mobile Navigation Menu ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // --- In-Browser Hash Verifier Tool ---
  const fileInput = document.getElementById('apk-verify-file');
  const verifyArea = document.getElementById('apk-verify-area');
  const verifyResult = document.getElementById('apk-verify-result');
  const calculatedShaEl = document.getElementById('calculated-sha256');
  const hashMatchStatusEl = document.getElementById('hash-match-status');

  const OFFICIAL_SHA256 = "f1747ea198fdcf15420ab91829b5a6a48d62ddef01bc2b6533b9a1790868a7e1";

  if (fileInput && verifyArea) {
    verifyArea.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      verifyArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        verifyArea.classList.add('border-blue-500', 'bg-blue-950/20');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      verifyArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        verifyArea.classList.remove('border-blue-500', 'bg-blue-950/20');
      }, false);
    });

    verifyArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        processVerificationFile(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files.length > 0) {
        processVerificationFile(fileInput.files[0]);
      }
    });

    async function processVerificationFile(file) {
      if (verifyResult) verifyResult.classList.remove('hidden');
      if (hashMatchStatusEl) {
        hashMatchStatusEl.innerHTML = `<span class="text-blue-400 animate-pulse">Menghitung SHA-256 (${(file.size / (1024*1024)).toFixed(2)} MB)...</span>`;
      }
      if (calculatedShaEl) calculatedShaEl.textContent = "...";

      try {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (calculatedShaEl) calculatedShaEl.textContent = hashHex;

        if (hashHex.toLowerCase() === OFFICIAL_SHA256.toLowerCase()) {
          if (hashMatchStatusEl) {
            hashMatchStatusEl.innerHTML = `
              <div class="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
                <span>VALID & ASLI: File APK 100% cocok dengan rilis resmi StoragePlus Basic!</span>
              </div>
            `;
          }
        } else {
          if (hashMatchStatusEl) {
            hashMatchStatusEl.innerHTML = `
              <div class="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                <span>PERHATIAN: Checksum berbeda. Pastikan Anda menguji file StoragePlus-Basic.apk yang asli.</span>
              </div>
            `;
          }
        }
        if (window.lucide) window.lucide.createIcons();
      } catch (err) {
        if (hashMatchStatusEl) {
          hashMatchStatusEl.textContent = "Gagal memproses file. Silakan coba lagi.";
        }
      }
    }
  }
});

