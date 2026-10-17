(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Поява блоків при прокручуванні
  const groups = [
    ...document.querySelectorAll('.feature .text, .feature .phone, section .eyebrow, section h2, .support p, .support .btn'),
  ];
  groups.forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.cards').forEach(list =>
    [...list.children].forEach((card, i) => {
      card.classList.add('reveal');
      card.style.setProperty('--i', i);
    }));

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Слайд-шоу в hero: головна ⇄ прогноз
  const phone = document.querySelector('.hero .phone');
  if (!phone || reduce) return;
  const first = phone.querySelector('img');
  const shots = ['03_forecast'].map(name => {
    const img = new Image();
    img.src = first.src.replace('01_home', name);
    img.alt = '';
    img.className = 'off';
    phone.append(img);
    return img;
  });
  const all = [first, ...shots];
  let cur = 0;
  setInterval(() => {
    if (document.hidden) return;
    const next = (cur + 1) % all.length;
    // Перший кадр лежить знизу: його не ховаємо, лише накриваємо
    if (next === 0) all[cur].classList.add('off');
    else all[next].classList.remove('off');
    if (cur !== 0 && next !== 0) all[cur].classList.add('off');
    cur = next;
  }, 3500);
})();
