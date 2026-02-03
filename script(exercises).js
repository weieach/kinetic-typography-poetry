const splitIntoWords = document.querySelectorAll('.split-words');

splitIntoWords.forEach(splitIntoWords => {
  splitIntoWords.innerHTML = splitIntoWords.textContent
    .split(' ')
    .map(word => `<span class="word">${word}</span>`)
    .join(' ');
});


const textParallax = document.querySelector('.text-parallax');

if (textParallax) {
  textParallax.innerHTML = textParallax.textContent
    .split(' ')
    .map(word => {
      const dataSpeed = Math.random(2) + 0.5;
      return `<span class="word" data-speed="${dataSpeed}">${word}</span>`;
    })
    .join(' ');

  const parallaxSection = document.querySelector('.text-parallax-section');
  const parallaxWords = textParallax.querySelectorAll('.word');

  if (parallaxSection && parallaxWords.length && window.gsap) {
    gsap.to(parallaxWords, {
      yPercent: (i, el) => -100 * Number(el.dataset.speed || 0),
      ease: "none",
      scrollTrigger: {
        trigger: parallaxSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

const rainy = document.querySelector('.rainy');

if (rainy) {
  let rainTimer = null;

  const createDrop = () => {
    const drop = document.createElement('span');
    drop.className = 'rain-drop';
    drop.textContent = "rain";

    const x = Math.random() * rainy.offsetWidth*8;
    drop.style.left = `${x}px`;
    drop.style.opacity = (Math.random() * 1 + 0.5).toFixed(2);
    drop.style.animationDuration = `${(Math.random() * 0.6 + 0.8).toFixed(2)}s`;

    rainy.appendChild(drop);
    drop.addEventListener('animationend', () => drop.remove());
  };

  const startRain = () => {
    if (rainTimer) return;
    createDrop();
    rainTimer = setInterval(createDrop, 120);
  };

  const stopRain = () => {
    clearInterval(rainTimer);
    rainTimer = null;
  };

  rainy.addEventListener('mouseenter', startRain);
  rainy.addEventListener('mouseleave', stopRain);
  rainy.addEventListener('touchstart', startRain, { passive: true });
  rainy.addEventListener('touchend', stopRain);
}