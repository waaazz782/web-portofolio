/**
 * HERO COMPONENT LOGIC
 */
export function initHeroTyping() {
  const typingElement = document.getElementById('heroTypingText');
  if (!typingElement) return;

  const targetText = typingElement.getAttribute('data-text') || 'Amrnsyh';
  let isDeleting = false;
  let charIndex = 0;
  const baseTypingSpeed = 140;
  const deleteSpeed = 75;

  typingElement.textContent = '';

  function step() {
    if (!isDeleting) {
      charIndex++;
      typingElement.textContent = targetText.slice(0, charIndex);

      if (charIndex === targetText.length) {
        isDeleting = true;
        setTimeout(step, 3000);
        return;
      }

      const variance = (Math.random() - 0.5) * 40;
      const speed = Math.max(80, baseTypingSpeed + variance);
      setTimeout(step, speed);
    } else {
      charIndex--;
      typingElement.textContent = targetText.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        setTimeout(step, 700);
        return;
      }

      setTimeout(step, deleteSpeed);
    }
  }

  setTimeout(step, 450);
}

export function initHero() {
  initHeroTyping();

  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statValues.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const isPercent = el.textContent.includes('%');
            const hasPlus = el.textContent.includes('+');
            let current = 0;
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
              current += 1;
              el.textContent = `${current}${hasPlus ? '+' : ''}${isPercent ? '%' : ''}`;
              if (current >= target) {
                el.textContent = `${target}${hasPlus ? '+' : ''}${isPercent ? '%' : ''}`;
                clearInterval(timer);
              }
            }, Math.max(stepTime, 20));
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsDeck = document.querySelector('.hero-stats-deck');
  if (statsDeck) observer.observe(statsDeck);
}
