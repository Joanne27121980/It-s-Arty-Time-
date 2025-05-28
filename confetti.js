// Wait until DOM content loads to start
window.addEventListener('DOMContentLoaded', () => {
  const confettiCount = 50; // how many pieces
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-wrapper';
  document.body.appendChild(confettiContainer);

  const colors = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'violet', 'lime', 'gold', 'cyan'];

  const confettis = [];

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Initial position (0,0) at center (because container is centered)
    confetti.style.transform = `translate(0px, 0px) rotate(0deg)`;

    // Each confetti gets random properties:
    const angle = Math.random() * 2 * Math.PI; // direction in radians
    const speed = 2 + Math.random() * 4; // px per frame
    const rotationSpeed = (Math.random() - 0.5) * 20; // degrees per frame
    const lifetime = 100 + Math.random() * 50; // frames (~time to fade)

 confettis.push({
  element: confetti,
  x: (Math.random() - 0.5) * 10, // start somewhere within 5px radius around center
  y: (Math.random() - 10) * 10,
  angle,
  speed,
  rotation: 0,
  rotationSpeed,
  lifetime,
  age: 0,
});


    confettiContainer.appendChild(confetti);
  }

  // Animation loop
  function animate() {
    let allDone = true;

    confettis.forEach(confetti => {
      if (confetti.age < confetti.lifetime) {
        allDone = false;

        // Move confetti
        confetti.x += Math.cos(confetti.angle) * confetti.speed;
        confetti.y += Math.sin(confetti.angle) * confetti.speed;

        // Rotate confetti
        confetti.rotation += confetti.rotationSpeed;

        // Fade out near end of lifetime
        const opacity = 1 - confetti.age / confetti.lifetime;

        // Apply styles
        confetti.element.style.transform = `translate(${confetti.x}px, ${confetti.y}px) rotate(${confetti.rotation}deg)`;
        confetti.element.style.opacity = opacity;

        confetti.age++;
      } else {
        // Remove confetti from DOM when done
        if (confetti.element.parentNode) {
          confetti.element.parentNode.removeChild(confetti.element);
        }
      }
    });

    // Continue animating unless all confetti are gone
    if (!allDone) {
      requestAnimationFrame(animate);
    } else {
      // Remove container after animation
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }
  }

  animate();
});
