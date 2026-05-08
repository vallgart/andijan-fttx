document.addEventListener('DOMContentLoaded', () => {
  // === COMPONENT: FAQ ===
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const active = item.classList.contains('active-state');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active-state'));
      if (!active) item.classList.add('active-state');
    });
  });

  // === COMPONENT: TABS ===
  document.querySelectorAll('.tabs-container').forEach(container => {
    const tabs   = container.querySelectorAll('.tablist-item');
    const panels = container.querySelectorAll('.tab-content');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('tablist-item--active-state'));
        panels.forEach(p => p.classList.remove('active-state'));
        tab.classList.add('tablist-item--active-state');
        panels[i].classList.add('active-state');
      });
    });
  });

  // === COMPONENT: POP-UP ===
  const overlay     = document.getElementById('custom-popup-overlay');
  const popup       = document.getElementById('custom-popup');
  const closeBtn    = document.getElementById('custom-popup-close');
  const openBtns    = document.querySelectorAll('.btn-custom');
  const checkboxes  = ['conditions-rules','oferta-rules'].map(id => document.getElementById(id));
  const submitBtn   = document.getElementById('custom-popup-btn');
  const anchorCloses= document.querySelectorAll('.close-popup-on-anchor');

  if (overlay && popup && closeBtn && submitBtn) {
    const openPopup = () => {
      overlay.style.display        = 'flex';
      popup.style.display          = 'block';
      document.body.style.overflow = 'hidden';
      popup.setAttribute('aria-hidden','false');
    };
    const closePopup = () => {
      overlay.style.display        = 'none';
      popup.style.display          = 'none';
      document.body.style.overflow = '';
      popup.setAttribute('aria-hidden','true');
    };
    const updateSubmit = () => {
      const ok = checkboxes.every(cb => cb?.checked);
      submitBtn.classList.toggle('disabled-state', !ok);
      submitBtn.disabled = !ok;
      submitBtn.tabIndex = ok ? 0 : -1;
    };

    openBtns.forEach(b => b.addEventListener('click', e => {
      e.preventDefault(); openPopup();
    }));
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') closePopup();
    });
    anchorCloses.forEach(a => a.addEventListener('click', closePopup));
    checkboxes.forEach(cb => cb?.addEventListener('change', updateSubmit));

    // Инициализация
    closePopup();
    updateSubmit();
  }
});
