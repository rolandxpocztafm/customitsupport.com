// main.js
// Dynamically loads partial HTML files into placeholders, handles responsive mobile menu, EmailJS contact form, and i18n translation

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

// Utility: Load locales and initialize i18n
function loadLocalesAndInit(lang = "en") {
  Promise.all([
    fetch("locales/en.json").then(r => r.json()),
    fetch("locales/nl.json").then(r => r.json())
  ]).then(([en, nl]) => {
    i18next.init({
      lng: lang,
      resources: {
        en: { translation: en },
        nl: { translation: nl }
      }
    }, function () {
      localizeContent();
    });
  });
}

// Utility: Localize all content currently in DOM
function localizeContent() {
  // Replace text content for elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = i18next.t(key);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      // For input fields, set placeholder if applicable
      if (el.hasAttribute("data-i18n-placeholder")) {
        el.placeholder = value;
      }
    } else if (el.tagName === "OPTION") {
      el.textContent = value;
    } else {
      el.innerHTML = value;
    }
  });
  // Replace placeholder for inputs/textareas with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = i18next.t(key);
  });
}

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
      // Always localize after loading new partial
      localizeContent();
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

  // Initialize i18n and language switcher after a short delay to allow nav to load
  setTimeout(() => {
    loadLocalesAndInit(localStorage.getItem("lang") || "en");
    initLanguageSwitcher();
  }, 300);
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
  let form = document.getElementById("contact-form");
  if (!form) {
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
    emailjs.init('4z9M06el79Z_xG-M-');
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.website && form.website.value) {
      form.reset();
      return;
    }

    if (typeof emailjs !== "undefined" && typeof emailjs.sendForm === "function") {
      emailjs.sendForm('service_m13t0ho', 'template_zatfyzn', this)
        .then(() => {
          if (formMsg) {
            formMsg.textContent = i18next.t("contact.sent");
            formMsg.classList.remove("hidden");
            formMsg.classList.add("text-green-700");
          } else {
            alert(i18next.t("contact.sent"));
          }
          this.reset();
        }, (error) => {
          if (formMsg) {
            formMsg.textContent = i18next.t("contact.failed");
            formMsg.classList.remove("hidden");
            formMsg.classList.remove("text-green-700");
            formMsg.classList.add("text-red-700");
          } else {
            alert(i18next.t("contact.failed"));
          }
          if (window.console && console.error) {
            console.error('EmailJS Error:', error);
          }
        });
    } else {
      if (formMsg) {
        formMsg.textContent = i18next.t("contact.sent");
        formMsg.classList.remove("hidden");
        formMsg.classList.add("text-green-700");
      } else {
        alert(i18next.t("contact.sent"));
      }
      this.reset();
    }
  });
}

// Language switcher logic for nav and mobile
function initLanguageSwitcher() {
  function switchLang(lang) {
    i18next.changeLanguage(lang, localizeContent);
    localStorage.setItem("lang", lang);
  }
  document.body.addEventListener("click", function (e) {
    if (e.target.id === "lang-en" || e.target.id === "lang-en-mobile") {
      switchLang("en");
    }
    if (e.target.id === "lang-nl" || e.target.id === "lang-nl-mobile") {
      switchLang("nl");
    }
  });
}
