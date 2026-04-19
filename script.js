document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");
  const linkItems = document.querySelectorAll(".nav__link");

  const toggleNav = () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  navToggle?.addEventListener("click", toggleNav);

  linkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (!id) return;
        const navItem = document.querySelector(`.nav__link[href="#${id}"]`);
        if (!navItem) return;
        if (entry.isIntersecting) {
          linkItems.forEach((item) => item.classList.remove("is-active"));
          navItem.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  document.querySelectorAll("main section").forEach((section) => {
    observer.observe(section);
  });

  const initializeLenis = () => {
    if (!window.Lenis) return null;
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis;
  };

  initializeLenis();

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll("[data-animate]");

    fadeElements.forEach((element) => {
      const type = element.getAttribute("data-animate");
      const animationConfig = {
        "fade-up": { y: 40, opacity: 0 },
        "slide-up": { y: 80, opacity: 0 },
        rise: { y: 30, opacity: 0 },
        stagger: { y: 30, opacity: 0 },
        tilt: { y: 60, rotateX: -8, opacity: 0 },
      };

      const config = animationConfig[type] || { opacity: 0, y: 40 };

      gsap.from(element, {
        ...config,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const gallery = document.querySelector("[data-animate='gallery']");
    if (gallery) {
      const items = gallery.querySelectorAll(".gallery__item");
      gsap.from(items, {
        yPercent: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gallery,
          start: "top 75%",
        },
      });
    }

    gsap.to(".hero__bg img", {
      scale: 1,
      duration: 1.8,
      ease: "power3.out",
    });

    gsap.from(".hero__content > *", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.2,
    });

    const parallaxElements = document.querySelectorAll("[data-parallax]");
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax")) || 0.4;
      gsap.to(element, {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          scrub: true,
        },
      });
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
});

