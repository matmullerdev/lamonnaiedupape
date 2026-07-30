const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const heroAnimation = document.querySelector(".hero-animation");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && heroAnimation) {
  const podCount = window.innerWidth < 720 ? 11 : 20;

  for (let index = 0; index < podCount; index += 1) {
    const pod = document.createElement("span");
    const size = 24 + Math.random() * 34;
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * -18;
    const drift = -60 + Math.random() * 120;
    const rotate = -30 + Math.random() * 60;

    pod.className = "floating-pod";
    pod.style.left = `${Math.random() * 100}%`;
    pod.style.setProperty("--pod-size", `${size}px`);
    pod.style.setProperty("--pod-duration", `${duration}s`);
    pod.style.setProperty("--pod-delay", `${delay}s`);
    pod.style.setProperty("--pod-drift", `${drift}px`);
    pod.style.setProperty("--pod-rotate", `${rotate}deg`);

    heroAnimation.appendChild(pod);
  }
}
