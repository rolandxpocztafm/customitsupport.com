```javascript
// main.js
// Dynamically loads partial HTML files into placeholders, handles responsive mobile menu, EmailJS contact form, Snipcart checkout, and robust i18n translation

const includes = [
  { id: "nav-placeholder", file: "nav.html" },
  { id: "hero-placeholder", file: "hero.html" },
  { id: "about-placeholder", file: "about.html" },
  { id: "services-placeholder", file: "services.html" },
  { id: "portfolio-placeholder", file: "portfolio.html" },
  { id: "testimonials-placeholder", file: "testimonials.html" },
  { id: "contact-placeholder", file: "contact.html" },
  { id: "footer-placeholder", file: "footer.html" },
  { id: "shop-placeholder", file: "shop.html" } // Added shop partial
];

// Hold loaded translations
let translations = { en: null, nl: null };

// 1. Load locales before any i18n usage
function fetchLocales() {
  return Promise.all([
    fetch("locales/en.json").then(r => r.json()).catch(() => ({})),
    fetch("locales/nl.json").then(r => r.json()).catch(() => ({}))
  ]).then(([en, nl]) => {
    translations.en = en;
    translations.nl = nl;
  });
}

// 2. Init i18next after locales loaded
function initI18n(lang = "en") {
  return new Promise(resolve => {
    i18next.init({
      lng: lang,
      fallbackLng: 'en',
      debug: false,
      resources: {
        en: { translation: translations.en },
        nl: { translation: translations.nl }
      },
      returnNull: false,
      returnEmptyString: false,
      parseMissingKeyHandler: function(key) { return key; }
    }, function() {
      resolve();
    });
  });
}

// 3. Localize all content in DOM
function localizeContent() {
  // Elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    let value = i18next.t(key);
    // Fallback: show key if missing
    if (!value || value === key) value = translations.en?.[key.split('.').shift()] || key;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.hasAttribute("data-i18n-placeholder")) el.placeholder = value;
    } else if (el.tagName === "OPTION") {
      el.textContent = value;
    } else {
      el.innerHTML = value;
    }
  });
  // Placeholder fields
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    let value = i18next.t(key);
    if (!value || value === key) value = translations.en?.[key.split('.').shift()] || key;
    el.placeholder = value;
  });
}

// 4. Language switcher for desktop and mobile
function initLanguageSwitcher() {
  function switchLang(lang) {
    i18next.changeLanguage(lang, localizeContent);
    localStorage.setItem("lang", lang);
  }
  document.body.addEventListener("click", function (e) {
    if (e.target.id === "lang-en" || e.target.id === "lang-en-mobile") switchLang("en");
    if (e.target.id === "lang-nl" || e.target.id === "lang-nl-mobile") switchLang("nl");
  });
}

// 5. Load partials, then localize
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
      if (id === "shop-placeholder") initCheckoutForm(); // Initialize shop checkout
      localizeContent();
    })
    .catch(err => {
      document.getElementById(id).innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
    });
}

// 6. DOM ready: load everything in order
document.addEventListener("DOMContentLoaded", () => {
  fetchLocales().then(() => {
    const lang = localStorage.getItem("lang") || "en";
    return initI18n(lang);
  }).then(() => {
    includes.forEach(inc => {
      if (document.getElementById(inc.id)) loadPartial(inc.id, inc.file);
    });
    initLanguageSwitcher();
  });
});

// 7. Mobile menu logic
function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

// 8. Contact form logic
function initContactForm() {
  let form = document.getElementById("contact-form");
  if (!form) {
    const contactSection = document.getElementById("contact-placeholder");
    if (contactSection) form = contactSection.querySelector("form");
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

// 9. Checkout form logic for shop
function initCheckoutForm() {
  let form = document.getElementById("checkout-form");
  if (!form) {
    const shopSection = document.getElementById("shop-placeholder");
    if (shopSection) form = shopSection.querySelector("#checkout-form");
  }
  let formMsg = document.getElementById("checkout-message");
  if (!formMsg && form) {
    formMsg = document.createElement("div");
    formMsg.id = "checkout-message";
    formMsg.className = "text-center text-green-600 text-sm mt-4 hidden";
    form.appendChild(formMsg);
  }
  if (!form) return;

  // Toggle crypto verification field
  const paymentMethod = document.getElementById("payment-method");
  const cryptoVerifySection = document.getElementById("crypto-verify-section");
  if (paymentMethod && cryptoVerifySection) {
    paymentMethod.addEventListener("change", (e) => {
      cryptoVerifySection.classList.toggle("hidden", e.target.value !== "crypto");
    });
  }

  // Snipcart cart toggle
  if (typeof Snipcart !== "undefined") {
    Snipcart.events.on('cart.opened', () => {
      document.getElementById('shop').classList.add('hidden');
      document.getElementById('checkout').classList.remove('hidden');
      localizeContent(); // Reapply translations
    });
    Snipcart.events.on('cart.closed', () => {
      document.getElementById('shop').classList.remove('hidden');
      document.getElementById('checkout').classList.add('hidden');
    });
  }

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const paymentMethod = document.getElementById("payment-method").value;
    const customer = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value
    };

    if (paymentMethod === "fiat" && typeof Stripe !== "undefined") {
      try {
        const stripe = Stripe('YOUR_STRIPE_KEY');
        const { error, paymentIntent } = await stripe.createPaymentIntent({
          amount: Snipcart.store.getState().cart.total * 100,
          currency: 'eur',
          metadata: { customer }
        });
        if (error) throw new Error(error.message);
        if (formMsg) {
          formMsg.textContent = i18next.t("checkout.success");
          formMsg.classList.remove("hidden", "text-red-700");
          formMsg.classList.add("text-green-700");
        }
        window.location.href = '/order-confirmation.html';
      } catch (error) {
        if (formMsg) {
          formMsg.textContent = i18next.t("checkout.failed");
          formMsg.classList.remove("hidden", "text-green-700");
          formMsg.classList.add("text-red-700");
        }
      }
    } else if (paymentMethod === "crypto") {
      if (document.getElementById("crypto-verify").checked) {
        try {
          // Placeholder for CoinPayments redirect
          window.location.href = `https://api.coinpayments.net/?key=YOUR_COINPAYMENTS_KEY&amount=${Snipcart.store.getState().cart.total}&currency=EUR`;
        } catch (error) {
          if (formMsg) {
            formMsg.textContent = i18next.t("checkout.failed");
            formMsg.classList.remove("hidden", "text-green-700");
            formMsg.classList.add("text-red-700");
          }
        }
      } else {
        if (formMsg) {
          formMsg.textContent = i18next.t("checkout.crypto_verify_required");
          formMsg.classList.remove("hidden", "text-green-700");
          formMsg.classList.add("text-red-700");
        }
      }
    }
  });
}
```
