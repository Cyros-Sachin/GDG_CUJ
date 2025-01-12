'use strict';
import env from 'config.js';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/*
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 40) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);



document.getElementById('button').addEventListener('click', function () {
  const video = document.getElementById('video');
  const thumbnail = document.getElementById('thumbnail');
  const playButton = document.getElementById('button');

  video.style.display = 'block';
  thumbnail.style.display = 'none';
  playButton.style.display = 'none';
  video.play();
});


const form = document.getElementById('newsletterForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form reload

  const email = document.getElementById('Email').value;

  try {
    const response = await fetch('https://gdg-cuj-backend.vercel.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });

    if (response.ok) {
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('Error: Unable to subscribe at this moment.');
  }
});


const feedbackLink2 = document.getElementById('Feedback'); // Feedback link in navbar
const feedbackPopup = document.getElementById('feedbackPopup');
const closePopup = document.getElementById('closePopup');

// Open Popup

feedbackLink2.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  feedbackPopup.style.display = 'flex';
});

// Close Popup
closePopup.addEventListener('click', () => {
  feedbackPopup.style.display = 'none';
});

// Close Popup When Clicking Outside
window.addEventListener('click', (e) => {
  if (e.target === feedbackPopup) {
    feedbackPopup.style.display = 'none';
  }
});


const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('${import.meta.env.VITE_BACKEND_URL}/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message
      }),
    });

    if (response.ok) {
      alert('Thank you for your feedback!');
      // Optionally reset the form
      feedbackForm.reset();
    } else {
      alert('Failed to send feedback. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
});