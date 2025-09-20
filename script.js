const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

document.addEventListener('DOMContentLoaded', () => {
  const yearNode = select('#year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const navToggle = select('.nav-toggle');
  const navigation = select('#primary-navigation');

  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    selectAll('a', navigation).forEach((link) => {
      link.addEventListener('click', () => {
        if (navigation.classList.contains('is-open')) {
          navigation.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const themeToggles = selectAll('[data-theme-toggle]');
  const THEME_STORAGE_KEY = 'theme-preference';

  const readStoredTheme = () => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const writeStoredTheme = (value) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch (error) {
      // Storage might be unavailable (e.g., private mode)
    }
  };

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    const targetLabel = isLight
      ? 'Switch to dark theme'
      : 'Switch to light theme';

    document.body.classList.toggle('theme-light', isLight);

    themeToggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(isLight));
      toggle.setAttribute('aria-label', targetLabel);
      toggle.setAttribute('title', targetLabel);
      toggle.dataset.theme = isLight ? 'light' : 'dark';
    });
  };

  const storedTheme = readStoredTheme();
  const prefersLight =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme =
    storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : prefersLight
      ? 'light'
      : 'dark';

  applyTheme(initialTheme);

  themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('theme-light')
        ? 'dark'
        : 'light';

      applyTheme(nextTheme);
      writeStoredTheme(nextTheme);

      if (
        toggle.classList.contains('theme-toggle--nav') &&
        navigation &&
        navigation.classList.contains('is-open') &&
        navToggle
      ) {
        navigation.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (!storedTheme && typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handlePreferenceChange = (event) => {
      if (!readStoredTheme()) {
        applyTheme(event.matches ? 'light' : 'dark');
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handlePreferenceChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handlePreferenceChange);
    }
  }

  const scrollButtons = selectAll('[data-scroll-to]');
  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.scrollTo;
      if (target) {
        if (target === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const destination = select(`#${target}`);
          if (destination) {
            destination.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  const sections = selectAll('main section[id]');
  const navLinks = selectAll('.primary-navigation a');

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.hash === `#${id}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
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
