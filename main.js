// main.js
// Dynamically loads partial HTML files into placeholders and handles the responsive mobile menu

// List of placeholders and corresponding files
const includes = [
  { id: "nav-placeholder", file: "nav.html" },
  { id: "hero-placeholder", file: "hero.html" },
  { id: "about-placeholder", file: "about.html" },
  { id: "services-placeholder", file: "services.html" },
  { id: "portfolio-placeholder", file: "portfolio.html" },
  { id: "testimonials-placeholder", file: "testimonials.html" },
  { id: "contact-placeholder", file: "contact.html" },
  { id: "footer-placeholder", file: "footer.html" }
];

// Function to load a partial into a placeholder div
function loadPartial(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === "nav-placeholder") initMobileMenu();
      if (id === "contact-placeholder") initContactForm();
    })
    .catch(err => {
      document.getElementById(id).innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
    });
}

// Load all partials after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  includes.forEach(inc => {
    if (document.getElementById(inc.id)) {
      loadPartial(inc.id, inc.file);
    }
  });
});

// Responsive mobile menu toggle logic
function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    // Close menu on link click (improves UX)
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

// Contact form submission logic
function initContactForm() {
  const form = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-message");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Example: Replace with your EmailJS userID/service/template or other integration
    if (typeof emailjs !== "undefined") {
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
        .then(() => {
          formMsg.textContent = "Thank you! Your message has been sent.";
          formMsg.classList.remove("hidden");
          form.reset();
        }, () => {
          formMsg.textContent = "An error occurred. Please try again later.";
          formMsg.classList.remove("hidden");
        });
    } else {
      // Fallback: Just show a fake success
      formMsg.textContent = "Thank you! Your message has been sent (demo mode).";
      formMsg.classList.remove("hidden");
      form.reset();
    }
  });
}