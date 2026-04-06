/**
 * Shikarpur Restaurant - Main JavaScript
 * Handles Loading, Navigation, Cart Logic, Menu Filtering, form validation, and animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Loader ---
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1200);

  // --- Sticky Navigation ---
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    // Sticky Nav logic
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top logic
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  function openNav() {
    navMenu.classList.add("active");
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav on overlay click
  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // --- Cart Overlay & Panel ---
  const cartToggle = document.getElementById("cart-toggle");
  const cartPanel = document.getElementById("cart-panel");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCart = document.getElementById("close-cart");

  function toggleCart() {
    cartPanel.classList.toggle("active");
    cartOverlay.classList.toggle("active");

    // Prevent body scroll when cart is open
    if (cartPanel.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  cartToggle.addEventListener("click", toggleCart);
  closeCart.addEventListener("click", toggleCart);
  cartOverlay.addEventListener("click", toggleCart);

  // --- Menu Data and Filtering Logic ---
  const menuData = [
    {
      id: 1,
      name: "Royal Prawn Tempura",
      category: "starters",
      price: 1800,
      desc: "Crispy fried king prawns served with a delicate gold-leaf dipping sauce.",
      img: "https://images.unsplash.com/photo-1700954356183-62fc4c2507e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByYXduJTIwdGVtcG9yYSUyMGRpc2h8ZW58MHx8MHx8fDA%3D",
      tag: "Premium ⭐",
    },
    {
      id: 2,
      name: "Stuffed Chicken Roulade",
      category: "main-course",
      price: 2100,
      desc: "Tender chicken breast stuffed with spinach and cream cheese, glazed in herbs.",
      img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
      tag: "Popular ⭐",
    },
    {
      id: 3,
      name: "Truffle Mushroom Risotto",
      category: "starters",
      price: 1550,
      desc: "Rich Arborio rice creamy risotto infused with authentic black truffle.",
      img: "https://images.unsplash.com/photo-1673720111785-4f189a234616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRydWZmbGUlMjBtYXNocm9vbSUyMGRpc2h8ZW58MHx8MHx8fDA%3D",
      tag: "",
    },
    {
      id: 4,
      name: "Shahi Mutton Karahi",
      category: "main-course",
      price: 2800,
      desc: "Locally sourced prime mutton wok-fried with our chef's secret spices.",
      img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80",
      tag: "Spicy 🌶️",
    },
    {
      id: 5,
      name: "24k Gold Ferrero Cake",
      category: "desserts",
      price: 1200,
      desc: "A slice of decadent chocolate hazelnut cake wrapped in edible gold.",
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
      tag: "Must Try",
    },
    {
      id: 6,
      name: "Blue Lagoon Mojito",
      category: "drinks",
      price: 550,
      desc: "Refreshing iced mint mocktail infused with blue curaçao and citrus.",
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80",
      tag: "",
    },
  ];

  const menuGrid = document.getElementById("menu-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderMenu(items) {
    menuGrid.innerHTML = "";
    items.forEach((item) => {
      const tagHTML = item.tag
        ? `<span class="menu-tag">${item.tag}</span>`
        : "";
      const html = `
                <div class="menu-card" data-category="${item.category}">
                    <div class="menu-img">
                        ${tagHTML}
                        <img src="${item.img}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="menu-content">
                        <div class="menu-header">
                            <h3 class="menu-title">${item.name}</h3>
                            <span class="menu-price">Rs ${item.price}</span>
                        </div>
                        <p class="menu-desc">${item.desc}</p>
                        <button class="add-btn" onclick="addToCart(${item.id})">Add to Order</button>
                    </div>
                </div>
            `;
      menuGrid.insertAdjacentHTML("beforeend", html);
    });
  }

  renderMenu(menuData);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Update active styling
      filterBtns.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      // Filter logic
      const filterValue = e.target.getAttribute("data-filter");
      if (filterValue === "all") {
        renderMenu(menuData);
      } else {
        const filtered = menuData.filter(
          (item) => item.category === filterValue,
        );
        renderMenu(filtered);
      }
    });
  });

  // --- Simple Cart State ---
  window.cartState = [];
  const cartBadge = document.querySelector(".cart-badge");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");

  window.addToCart = function (id) {
    const product = menuData.find((item) => item.id === id);
    window.cartState.push(product);
    updateCartUI();

    // Visual feedback
    cartToggle.classList.add("pulse");
    setTimeout(() => cartToggle.classList.remove("pulse"), 300);
  };

  function updateCartUI() {
    cartBadge.innerText = window.cartState.length;

    if (window.cartState.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="empty-cart-msg">Your cart is empty</div>';
      cartTotalPrice.innerText = "Rs 0.00";
      return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    window.cartState.forEach((item, index) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                    <div>
                        <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 4px;">${item.name}</h4>
                        <span style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">Rs ${item.price}</span>
                    </div>
                    <button style="background: none; border: none; color: #E53E3E; cursor: pointer; padding: 4px;" onclick="removeFromCart(${index})">
                        <i class="ph-fill ph-trash"></i>
                    </button>
                </div>
            `;
    });

    cartTotalPrice.innerText = `Rs ${total}`;
  }

  window.removeFromCart = function (index) {
    window.cartState.splice(index, 1);
    updateCartUI();
  };

  // --- Forms Submission Handling ---
  const resForm = document.getElementById("reservation-form");
  const resSuccessMsg = document.getElementById("reservation-success");

  if (resForm) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      resForm.style.opacity = "0";
      setTimeout(() => {
        resForm.style.display = "none";
        resSuccessMsg.classList.remove("hidden");
      }, 300);
    });
  }

  const contactForm = document.getElementById("contact-form");
  const conSuccessMsg = document.getElementById("contact-success");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.style.opacity = "0";
      setTimeout(() => {
        contactForm.style.display = "none";
        conSuccessMsg.classList.remove("hidden");
      }, 300);
    });
  }
});