// main.js
// Dynamically loads partial HTML files into placeholders and handles the responsive mobile menu and EmailJS contact form with honeypot spam protection

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

// Contact form submission logic with honeypot spam protection
function initContactForm() {
  // Support both "form" and "#contact-form" for backward compatibility
  let form = document.getElementById("contact-form");
  if (!form) {
    // fallback: first form in contact-placeholder section
    const contactSection = document.getElementById("contact-placeholder");
    if (contactSection) {
      form = contactSection.querySelector("form");
    }
  }
  let formMsg = document.getElementById("form-message");
  if (!formMsg && form) {
    formMsg = document.createElement("div");
    formMsg.id = "form-message";
    formMsg.className = "text-center text-green-600 text-sm mt-4 hidden";
    form.appendChild(formMsg);
  }
  if (!form) return;

  if (typeof emailjs !== "undefined" && typeof emailjs.init === "function") {
    emailjs.init('4z9M06el79Z_xG-M-'); // Replace with your EmailJS Public Key if different
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot check: if the hidden "website" field is filled, silently abort as spam
    if (form.website && form.website.value) {
      // Optionally, you could show an error or just do nothing (bots won't know)
      form.reset();
      return;
    }

    if (typeof emailjs !== "undefined" && typeof emailjs.sendForm === "function") {
      emailjs.sendForm('service_m13t0ho', 'template_zatfyzn', this)
        .then(() => {
          if (formMsg) {
            formMsg.textContent = "Thank you for your inquiry! We will contact you soon.";
            formMsg.classList.remove("hidden");
            formMsg.classList.add("text-green-700");
          } else {
            alert("Thank you for your inquiry! We will contact you soon.");
          }
          this.reset();
        }, (error) => {
          if (formMsg) {
            formMsg.textContent = "There was an error sending your message. Please try again later.";
            formMsg.classList.remove("hidden");
            formMsg.classList.remove("text-green-700");
            formMsg.classList.add("text-red-700");
          } else {
            alert("There was an error sending your message. Please try again later.");
          }
          if (window.console && console.error) {
            console.error('EmailJS Error:', error);
          }
        });
    } else {
      // Fallback: show fake success message
      if (formMsg) {
        formMsg.textContent = "Thank you! Your message has been sent (demo mode).";
        formMsg.classList.remove("hidden");
        formMsg.classList.add("text-green-700");
      } else {
        alert("Thank you! Your message has been sent (demo mode).");
      }
      this.reset();
    }
  });
}
