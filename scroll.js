document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

const sections = [...document.querySelectorAll('section')];

const scroll = () => {
  const direction = window.pageYOffset - document.lastScrollPosition > 0 ? 'down' : 'up';

  if (document.onWayTo === null) {
    const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;

    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;
      window.scrollTo(0, sections[destIndex].offsetTop);
    }
  }

  const visibleSectionIndex = sections.findIndex((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + window.innerHeight; // Use window.innerHeight for fixed 100vh height
    return window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom;
  });

  if (visibleSectionIndex !== -1) {
    sections.forEach((section, index) => {
      if (index === visibleSectionIndex) {
        section.className = 'active';
      } else {
        section.className = '';
      }
    });

    document.lastCentered = visibleSectionIndex;

    if (document.onWayTo === visibleSectionIndex) {
      document.onWayTo = null;
    }
  }

  document.lastScrollPosition = window.pageYOffset;
};

const setInitialActiveSection = () => {
  window.scrollTo(0, 0);
  sections[0].classList.add('active');
};

document.addEventListener('scroll', scroll);
window.addEventListener('load', setInitialActiveSection);
