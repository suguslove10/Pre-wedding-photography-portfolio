import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.classList.contains('reveal-img-container')) {
            const img = entry.target.querySelector('.reveal-img');
            if (img) img.classList.add('active');
          }
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.text-reveal, .reveal-img-container');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
