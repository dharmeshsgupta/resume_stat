const TOTAL = 300;
const images = [];
let loaded = 0;

const frame = document.getElementById('frame');
const loader = document.getElementById('loader');

// Preload all frames
for (let i = 1; i <= TOTAL; i++) {
  const img = new Image();
  img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
  img.onload = img.onerror = () => {
    loaded++;
    loader.textContent = `${Math.floor((loaded / TOTAL) * 100)}%`;
    if (loaded === TOTAL) boot();
  };
  images.push(img);
}

function boot() {
  loader.classList.add('hidden');

  gsap.registerPlugin(ScrollTrigger);

  const obj = { frame: 0 };
  gsap.to(obj, {
    frame: TOTAL - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '#scroll-track',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
    onUpdate: () => {
      const index = Math.floor(obj.frame);
      if (images[index] && images[index].complete) {
        frame.src = images[index].src;
      }
    },
  });
}
