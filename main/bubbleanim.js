window.addEventListener("load", () => {
  // Loader fade-out
  gsap.to("#loader", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
    }
  });

  // Animate heading
  gsap.from("h1", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate canvas
  gsap.from("canvas", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)"
  });

  // Fixed button animation using timeline approach
  const tl = gsap.timeline();
  
  // Set initial state for buttons
  gsap.set(".btn", {
    opacity: 0,
    y: 30,
    visibility: "visible"
  });
  
  // Animate buttons to final state
  tl.to(".btn", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 1,
    ease: "power2.out",
    onStart: () => {
      // Ensure proper layering during animation
      document.querySelectorAll(".btn").forEach(btn => {
        btn.style.position = "relative";
        btn.style.zIndex = "10";
        btn.style.pointerEvents = "auto";
        btn.style.display = "inline-block";
      });
    },
    onComplete: () => {
      // Double-check visibility after animation completes
      document.querySelectorAll(".btn").forEach(btn => {
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
        btn.style.pointerEvents = "auto";
      });
    }
  });
});
