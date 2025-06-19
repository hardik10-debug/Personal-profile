document.addEventListener('DOMContentLoaded', function() {
  // About Me Text Typing Effect
  function changeAboutMeText() {
      const aboutMeTexts = ["an Engineering Student", "a Full Stack Web Developer", "a Tech Enthusiast", "a Quick Learner", "a Coder", "a Team Player."];
      const typingSpeed = 100; // milliseconds per char
      const eraseSpeed = 50; // milliseconds per char during erasing
      const pausetime = 1500; // milliseconds to pause each text change
      const aboutMeElement = document.querySelector('.about-me');

      let testIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
          const currentText = aboutMeTexts[testIndex];
          // Typing
          if (!isDeleting && charIndex < currentText.length) {
              aboutMeElement.textContent += currentText[charIndex];
              charIndex++;
              setTimeout(type, typingSpeed);
          }
          // Erasing
          else if (isDeleting && charIndex > 0) {
              aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
              charIndex--;
              setTimeout(type, eraseSpeed);
          }
          // Switching the deleting or typing process
          else {
              isDeleting = !isDeleting;
              if (!isDeleting) {
                  testIndex = (testIndex + 1) % aboutMeTexts.length;
              }
              setTimeout(type, pausetime);
          }
      }
      type();
  }
  changeAboutMeText();

  // Intersection Observer for Progress Bars
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const progressBar = entry.target.querySelector('.progress-bar');
              const progress = progressBar.dataset.progress;

              progressBar.style.setProperty('--progress', `${progress}%`);
              progressBar.classList.add('animated');
          } else {
              const progressBar = entry.target.querySelector('.progress-bar');
              progressBar.classList.remove('animated');
          }
      });
  });

  const programmingLanguages = document.querySelectorAll('#programming-languages .skill');
  programmingLanguages.forEach(skill => {
      observer.observe(skill);
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
          body.classList.toggle('dark-mode');
          const currentMode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
          const icon = darkModeToggle.querySelector('i');
          icon.classList.toggle('fa-sun');
          icon.classList.toggle('fa-moon');
      });
  }

  // Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
          navMenu.classList.toggle('show');
      });
  }

  // Smooth Scrolling for Navigation Links
  const scrollToSection = (selector, sectionId) => {
      const link = document.querySelector(selector);
      const section = document.getElementById(sectionId);

      if (link && section) {
          link.addEventListener('click', (event) => {
              event.preventDefault(); // Prevent the default link behavior
              section.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
              });
          });
      }
  };

  scrollToSection('.nav-menu a[href="#contact-form"]', 'contact-form');
  scrollToSection('.nav-menu a[href="#skill"]', 'skill');
  scrollToSection('.nav-menu a[href="#education"]', 'education');
  scrollToSection('.nav-menu a[href="#Pro"]', 'Pro');
});

