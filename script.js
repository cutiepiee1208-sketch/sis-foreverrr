document.addEventListener('DOMContentLoaded', () => {
  // Pastel background shifts every second, with a smooth transition.
  const pastels = ['#ded3ff', '#ffe0ec', '#d8f5e8', '#fff0c9', '#d4efff', '#f6dcff', '#ffdfd2', '#e3f2c7', '#d8e0ff'];
  let colourIndex = 0;
  document.body.style.backgroundColor = pastels[0];
  window.setInterval(() => {
    colourIndex = (colourIndex + 1) % pastels.length;
    document.body.style.backgroundColor = pastels[colourIndex];
  }, 1000);

  // Tiny floating sparkles.
  const layer = document.querySelector('.sparkle-layer');
  if (layer) {
    const symbols = ['♡', '✦', '✿', '⋆', '♡'];
    window.setInterval(() => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      sparkle.style.left = `${Math.random() * 96}%`;
      sparkle.style.top = `${45 + Math.random() * 50}%`;
      sparkle.style.fontSize = `${12 + Math.random() * 18}px`;
      sparkle.style.color = ['#d778a3', '#9b86d8', '#86b8a3'][Math.floor(Math.random() * 3)];
      layer.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 3200);
    }, 550);
  }

  // Promise gate: all 10 must be ticked. Attempting early opens the playful warning page.
  const checks = [...document.querySelectorAll('.promise-check')];
  const progress = document.getElementById('promise-progress');
  const status = document.getElementById('promise-status');
  const next = document.getElementById('promise-next');
  if (checks.length && next) {
    const updatePromises = () => {
      const count = checks.filter(c => c.checked).length;
      if (progress) progress.style.width = `${count * 10}%`;
      if (status) status.textContent = `${count} / 10 promises done ${count === 10 ? '💗 unlocked!!' : '💌'}`;
      next.classList.toggle('unlocked', count === 10);
    };
    checks.forEach(check => check.addEventListener('change', updatePromises));
    next.addEventListener('click', () => {
      const allDone = checks.every(c => c.checked);
      window.location.href = allDone ? 'memory.html' : 'oops.html';
    });
    updatePromises();
  }

  // Open the letter scroll.
  const openLetter = document.getElementById('open-letter');
  const letterPaper = document.getElementById('letter-paper');
  if (openLetter && letterPaper) {
    openLetter.addEventListener('click', () => {
      const opening = letterPaper.classList.contains('hidden');
      letterPaper.classList.toggle('hidden');
      openLetter.setAttribute('aria-expanded', String(opening));
      openLetter.querySelector('span:last-child').textContent = opening ? 'your letter is open ♡' : 'click to open your letter';
      if (opening) letterPaper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Candle interaction.
  const flame = document.getElementById('candle-flame');
  const hint = document.getElementById('wish-hint');
  const blow = () => {
    if (!flame || flame.classList.contains('blown')) return;
    flame.classList.add('blown');
    if (hint) hint.textContent = 'Wish sent to the universe ✨💗';
    burstHearts();
  };
  if (flame) {
    flame.addEventListener('click', blow);
    flame.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blow(); } });
  }

  const saveWish = document.getElementById('save-wish');
  const wishInput = document.getElementById('wish-input');
  const wishMessage = document.getElementById('wish-message');
  if (saveWish && wishInput && wishMessage) {
    saveWish.addEventListener('click', () => {
      wishMessage.textContent = wishInput.value.trim()
        ? 'Wish saved right here on this page, just for you ♡ (refresh karogi toh clear ho jayega!)'
        : 'Pehle apni wish toh likh, madam ji 😭💗';
      if (wishInput.value.trim()) burstHearts();
    });
  }

  // Photo lightbox on the last page.
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const bigImage = lightbox.querySelector('img');
    const close = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.photo-grid img').forEach(img => {
      img.addEventListener('click', () => {
        bigImage.src = img.src;
        bigImage.alt = img.alt;
        lightbox.classList.remove('hidden');
      });
      img.style.cursor = 'zoom-in';
    });
    const closeBox = () => lightbox.classList.add('hidden');
    close.addEventListener('click', closeBox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeBox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBox(); });
  }

  function burstHearts() {
    if (!layer) return;
    for (let i = 0; i < 14; i++) {
      const heart = document.createElement('span');
      heart.className = 'sparkle';
      heart.textContent = ['♡', '💗', '✦'][i % 3];
      heart.style.left = `${35 + Math.random() * 30}%`;
      heart.style.top = `${45 + Math.random() * 25}%`;
      heart.style.fontSize = `${14 + Math.random() * 18}px`;
      heart.style.animationDuration = `${1.5 + Math.random()}s`;
      layer.appendChild(heart);
      window.setTimeout(() => heart.remove(), 3000);
    }
  }
});
