// animation.js

document.addEventListener("DOMContentLoaded", () => {
  // Navbar animation
  gsap.from("navbar", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Header animation
  gsap.from("#main h1", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });

  // Boxes animation (staggered entrance)
  gsap.from("#main .bg-gray-800", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1,
    stagger: 0.3,
    ease: "back.out(1.7)"
  });

  // Buttons pop in (scale + fade)
  gsap.fromTo(
    "#main button",
    { scale: 0.8, opacity: 0 },   // start state
    { scale: 1, opacity: 1, duration: 0.6, delay: 1.8, stagger: 0.3, ease: "elastic.out(1, 0.5)" } // end state
  );
});
