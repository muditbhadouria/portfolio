const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  const yearNode = select("#year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const navToggle = select(".nav-toggle");
  const navigation = select("#primary-navigation");

  if (navToggle && navigation) {
    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    selectAll("a", navigation).forEach((link) => {
      link.addEventListener("click", () => {
        if (navigation.classList.contains("is-open")) {
          navigation.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const scrollButtons = selectAll("[data-scroll-to]");
  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.scrollTo;
      if (target) {
        if (target === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const destination = select(`#${target}`);
          if (destination) {
            destination.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  });

  const sections = selectAll("main section[id]");
  const navLinks = selectAll(".primary-navigation a");

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.hash === `#${id}`) {
                link.classList.add("is-active");
              } else {
                link.classList.remove("is-active");
              }
            });
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
