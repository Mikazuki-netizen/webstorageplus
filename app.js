// StoragePlus Basic - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Phone Mockup Screen Switcher ---
  const screens = {
    sync: document.getElementById('screen-sync'),
    onboarding: document.getElementById('screen-onboarding'),
    browser: document.getElementById('screen-browser'),
    youtube: document.getElementById('screen-youtube'),
    security: document.getElementById('screen-security')
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
        btn.classList.add('active', 'border-blue-500', 'bg-blue-600/10', 'text-white');
        btn.classList.remove('border-slate-800', 'bg-slate-900/40', 'text-slate-400');
      } else {
        btn.classList.remove('active', 'border-blue-500', 'bg-blue-600/10', 'text-white');
        btn.classList.add('border-slate-800', 'bg-slate-900/40', 'text-slate-400');
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

  // --- Interactive Mockup: PIN Lock Screen & Onboarding ---
  const mockPinDots = document.querySelectorAll('.mock-pin-dot');
  const mockPinKeys = document.querySelectorAll('.mock-key-btn');
  const mockPinClear = document.getElementById('mock-key-clear');
  const mockPinStatus = document.getElementById('mock-pin-status');
  let enteredMockPin = "";

  function updateMockPinUi() {
    mockPinDots.forEach((dot, idx) => {
      if (idx < enteredMockPin.length) {
        dot.classList.add('bg-blue-500', 'scale-125');
        dot.classList.remove('bg-slate-700');
      } else {
        dot.classList.remove('bg-blue-500', 'scale-125');
        dot.classList.add('bg-slate-700');
      }
    });

    if (enteredMockPin.length === 6) {
      if (mockPinStatus) {
        mockPinStatus.textContent = "ID & PIN Terverifikasi! Membuka Cloud...";
        mockPinStatus.className = "text-xs font-semibold text-emerald-400 transition-colors text-center";
      }
      setTimeout(() => {
        switchMockupScreen('sync');
        enteredMockPin = "";
        updateMockPinUi();
        if (mockPinStatus) {
          mockPinStatus.textContent = "Masukkan 6 Digit PIN";
          mockPinStatus.className = "text-xs text-slate-400 transition-colors text-center";
        }
      }, 700);
    }
  }

  mockPinKeys.forEach(key => {
    key.addEventListener('click', () => {
      const val = key.getAttribute('data-val');
      if (enteredMockPin.length < 6 && val) {
        enteredMockPin += val;
        updateMockPinUi();
      }
    });
  });

  if (mockPinClear) {
    mockPinClear.addEventListener('click', () => {
      if (enteredMockPin.length > 0) {
        enteredMockPin = enteredMockPin.slice(0, -1);
        updateMockPinUi();
      }
    });
  }

  // --- Onboarding Tab Toggle inside Mockup ---
  const mockTabRegister = document.getElementById('mock-tab-register');
  const mockTabLogin = document.getElementById('mock-tab-login');
  const mockNameLabel = document.getElementById('mock-name-label');
  const mockNameInput = document.getElementById('mock-name-input');
  const mockHelperText = document.getElementById('mock-helper-text');

  if (mockTabRegister && mockTabLogin) {
    mockTabRegister.addEventListener('click', () => {
      mockTabRegister.className = "flex-1 py-1 text-center text-[10px] font-bold rounded-lg bg-blue-600 text-white transition-all";
      mockTabLogin.className = "flex-1 py-1 text-center text-[10px] font-medium rounded-lg text-slate-400 hover:text-white transition-all";
      if (mockNameLabel) mockNameLabel.textContent = "Daftar Akun Baru";
      if (mockNameInput) mockNameInput.placeholder = "ID / Nama Baru (Contoh: whatziptoya)";
      if (mockHelperText) mockHelperText.textContent = "💡 ID dicatat di Spreadsheet & folder cloud otomatis dibuat.";
    });

    mockTabLogin.addEventListener('click', () => {
      mockTabLogin.className = "flex-1 py-1 text-center text-[10px] font-bold rounded-lg bg-blue-600 text-white transition-all";
      mockTabRegister.className = "flex-1 py-1 text-center text-[10px] font-medium rounded-lg text-slate-400 hover:text-white transition-all";
      if (mockNameLabel) mockNameLabel.textContent = "Masuk Akun Terdaftar";
      if (mockNameInput) mockNameInput.placeholder = "ID / Nama Terdaftar (Contoh: whatziptoya)";
      if (mockHelperText) mockHelperText.textContent = "💡 Masukkan ID dan PIN untuk memulihkan akses gallery anda.";
    });
  }

  // --- Copy Checksum Buttons ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span class="text-emerald-400">Tersalin!</span>`;
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            btn.innerHTML = originalText;
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        });
      }
    });
  });

  // --- In-Browser Hash Verifier Tool ---
  const fileInput = document.getElementById('apk-verify-file');
  const verifyArea = document.getElementById('apk-verify-area');
  const verifyResult = document.getElementById('apk-verify-result');
  const calculatedShaEl = document.getElementById('calculated-sha256');
  const hashMatchStatusEl = document.getElementById('hash-match-status');

  const OFFICIAL_SHA256 = "7abff15f48ae095ddc0d077904eb09b76853da92f0cadf209e80d548b8948951";

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
