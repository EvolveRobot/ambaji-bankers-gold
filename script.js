const collections = [
  {
    title: "Gold Necklaces",
    category: "gold",
    initials: "GN",
    image: "assets/photo-gold-necklace.png",
    text: "Traditional, antique and lightweight necklace designs.",
  },
  {
    title: "Bangles",
    category: "gold",
    initials: "BG",
    image: "assets/photo-bangles.png",
    text: "Daily wear, bridal and festive bangle selections.",
  },
  {
    title: "Bridal Sets",
    category: "bridal",
    initials: "BS",
    image: "assets/photo-hero-bridal.png",
    text: "Complete wedding jewellery with harams and earrings.",
  },
  {
    title: "Diamond Rings",
    category: "diamond",
    initials: "DR",
    image: "assets/photo-diamond-ring.png",
    text: "Certified diamond rings for engagement and gifting.",
  },
  {
    title: "Silver Articles",
    category: "silver",
    initials: "SA",
    image: "assets/photo-silver-coins.png",
    text: "Pooja items, gifts, anklets and silverware.",
  },
  {
    title: "Gold Coins",
    category: "coins",
    initials: "GC",
    image: "assets/photo-gold-coins.png",
    text: "Coins for festivals, gifting and savings.",
  },
];

const products = [
  {
    name: "Antique Gold Haram",
    category: "bridal",
    initials: "AH",
    image: "assets/photo-bridal-set.png",
    price: "Price on request",
    text: "Long bridal haram with traditional detailing.",
  },
  {
    name: "Temple Necklace Set",
    category: "bridal",
    initials: "TN",
    image: "assets/photo-temple-necklace.png",
    price: "Price on request",
    text: "Classic temple-inspired wedding necklace set.",
  },
  {
    name: "Mango Mala",
    category: "gold",
    initials: "MM",
    image: "assets/photo-mango-mala.png",
    price: "Price on request",
    text: "South Indian mango motif necklace design.",
  },
  {
    name: "Bridal Vaddanam",
    category: "bridal",
    initials: "BV",
    image: "assets/photo-vaddanam.png",
    price: "Price on request",
    text: "Waist belt for traditional bridal styling.",
  },
  {
    name: "Daily Wear Bangles",
    category: "gold",
    initials: "DB",
    image: "assets/photo-bangles.png",
    price: "Rate based on weight",
    text: "Comfortable 22K bangles for regular wear.",
  },
  {
    name: "Solitaire Ring",
    category: "diamond",
    initials: "SR",
    image: "assets/photo-diamond-ring.png",
    price: "Certified pricing",
    text: "Minimal certified diamond ring for gifting.",
  },
  {
    name: "Silver Pooja Plate",
    category: "silver",
    initials: "SP",
    image: "assets/photo-silver-pooja.png",
    price: "Rate based on weight",
    text: "Silver pooja article for home and gifting.",
  },
  {
    name: "Lakshmi Gold Coin",
    category: "coins",
    initials: "LC",
    image: "assets/photo-gold-coins.png",
    price: "Live gold rate",
    text: "Festival coin with traditional Lakshmi motif.",
  },
];

function renderCollections() {
  document.querySelectorAll('[data-render="collections"]').forEach((target) => {
    const limit = Number(target.dataset.limit) || collections.length;
    target.innerHTML = collections
      .slice(0, limit)
      .map(
        (item) => `
          <article class="collection-card" id="${item.category}">
            ${
              item.image
                ? `<img class="collection-photo" src="${item.image}" alt="${item.title}" />`
                : `<div class="collection-art">${item.initials}</div>`
            }
            <div class="collection-body">
              <span class="tag">${item.category}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function renderProducts() {
  document.querySelectorAll('[data-render="products"]').forEach((target) => {
    const limit = Number(target.dataset.limit) || products.length;
    const category = target.dataset.category;
    const list = category ? products.filter((item) => item.category === category) : products;
    target.innerHTML = list
      .slice(0, limit)
      .map(
        (item) => `
          <article class="product-card" data-category="${item.category}" id="${item.category}">
            ${
              item.image
                ? `<img class="product-photo" src="${item.image}" alt="${item.name}" />`
                : `<div class="product-art">${item.initials}</div>`
            }
            <div class="product-body">
              <span class="tag">${item.category}</span>
              <h3>${item.name}</h3>
              <p>${item.text}</p>
              <strong>${item.price}</strong>
            </div>
          </article>
        `
      )
      .join("");
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.classList.remove("menu-open");
    });
  });
}

function setupFilters() {
  document.querySelectorAll('[data-filter-group="products"]').forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;

      const filter = button.dataset.filter;
      group.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const section = group.closest(".section-inner") || document;
      section.querySelectorAll(".product-card").forEach((card) => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });
}

function setupForms() {
  document.querySelectorAll("[data-visit-form]").forEach((form) => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const phone = form.elements.phone.value.replace(/\D/g, "");
      if (!form.reportValidity()) return;
      if (phone.length < 10) {
        status.textContent = "Enter a valid 10 digit phone number.";
        status.style.color = "#b91c1c";
        return;
      }
      status.textContent = "Appointment request received. Our showroom team will call you.";
      status.style.color = "#15803d";
      form.reset();
    });
  });
}

function scrollToHashAfterRender() {
  if (!window.location.hash) return;
  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;
  window.setTimeout(() => target.scrollIntoView({ block: "start" }), 80);
}

function setupFloatingWhatsApp() {
  const phone = "919841753758";
  const message = "Hi, I would like to enquire about Ambaji Bankers Jewellery.";
  const link = document.createElement("a");
  link.className = "floating-whatsapp";
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Chat on WhatsApp");
  link.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16.04 4.5c-6.25 0-11.33 4.91-11.33 10.96 0 1.93.53 3.81 1.54 5.47L4.5 27.5l6.86-1.72a11.74 11.74 0 0 0 4.68.96c6.25 0 11.33-4.92 11.33-10.97S22.29 4.5 16.04 4.5Zm0 20.39c-1.5 0-2.96-.35-4.27-1.03l-.31-.16-4.07 1.02 1.04-3.86-.2-.32a9.12 9.12 0 0 1-1.41-4.84c0-5.04 4.14-9.14 9.23-9.14s9.23 4.1 9.23 9.14-4.14 9.19-9.23 9.19Zm5.06-6.84c-.27-.13-1.63-.78-1.88-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.86 1.04-.16.18-.32.2-.59.07-.27-.13-1.15-.41-2.18-1.31-.81-.7-1.36-1.57-1.52-1.83-.16-.27-.02-.41.12-.54.12-.12.27-.31.41-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.61-1.43-.84-1.96-.22-.51-.45-.44-.61-.45h-.52c-.18 0-.47.07-.72.34-.25.27-.95.9-.95 2.19s.97 2.54 1.11 2.72c.13.18 1.91 2.83 4.64 3.97.65.27 1.16.43 1.55.55.65.2 1.24.17 1.71.1.52-.07 1.63-.65 1.86-1.28.23-.63.23-1.16.16-1.28-.07-.11-.25-.18-.52-.31Z" />
    </svg>
  `;
  document.body.appendChild(link);
}

renderCollections();
renderProducts();
setupMobileMenu();
setupFilters();
setupForms();
scrollToHashAfterRender();
setupFloatingWhatsApp();
