// ================= GLOBAL DATA & STATE ENGINE =================

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Farm Fresh Red Apples",
    category: "Fruits",
    price: 4,
    weight: 500,
    stock: 45,
    rating: 4.9,
    description: "Crisp, sweet, and hand-picked organic red gala apples from local orchards.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500"
  },
  {
    id: 2,
    name: "Organic Golden Bananas",
    category: "Fruits",
    price: 3,
    weight: 1000,
    stock: 38,
    rating: 4.8,
    description: "Naturally ripened, rich in potassium and farm fresh tropical bananas.",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500"
  },
  {
    id: 3,
    name: "Crunchy Farm Carrots",
    category: "Vegetables",
    price: 2,
    weight: 500,
    stock: 60,
    rating: 4.7,
    description: "Rich in beta-carotene, freshly harvested organic sweet orange carrots.",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500"
  },
  {
    id: 4,
    name: "Fresh Whole Pasteurized Milk",
    category: "Dairy",
    price: 3,
    weight: 1000,
    stock: 25,
    rating: 4.9,
    description: "100% farm-sourced fresh whole milk with pure creamy richness.",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=500"
  },
  {
    id: 5,
    name: "Artisan Whole Grain Bread",
    category: "Bakery",
    price: 4,
    weight: 450,
    stock: 18,
    rating: 4.8,
    description: "Stone-ground whole wheat sourdough loaf baked daily before dawn.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"
  },
  {
    id: 6,
    name: "Ripe Hass Avocados",
    category: "Fruits",
    price: 5,
    weight: 350,
    stock: 20,
    rating: 4.9,
    description: "Buttery, nutrient-dense California Hass avocados perfect for toast & salads.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500"
  },
  {
    id: 7,
    name: "Organic Tender Baby Spinach",
    category: "Vegetables",
    price: 3,
    weight: 250,
    stock: 30,
    rating: 4.7,
    description: "Washed and ready-to-eat organic nutrient-packed baby spinach leaves.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500"
  },
  {
    id: 8,
    name: "Farm Cheddar Cheese Block",
    category: "Dairy",
    price: 6,
    weight: 300,
    stock: 15,
    rating: 4.9,
    description: "Aged 12 months for a sharp, deep savory flavor. 100% grass-fed dairy.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500"
  }
];

// Initialize LocalStorage Data
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(SAMPLE_PRODUCTS));
}
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}
if (!localStorage.getItem('walletBalance')) {
  localStorage.setItem('walletBalance', '150');
}
if (!localStorage.getItem('wishlist')) {
  localStorage.setItem('wishlist', JSON.stringify([]));
}
if (!localStorage.getItem('compareList')) {
  localStorage.setItem('compareList', JSON.stringify([]));
}
if (!localStorage.getItem('orders')) {
  localStorage.setItem('orders', JSON.stringify([
    {
      id: 101,
      date: '2026-08-29',
      items: [
        { product: SAMPLE_PRODUCTS[0], quantity: 2, subtotal: 8 },
        { product: SAMPLE_PRODUCTS[3], quantity: 1, subtotal: 3 }
      ],
      totalAmount: 11,
      status: 'DELIVERED',
      deliveryType: 'DOORSTEP',
      deliverySlot: 'Morning (8:00 AM - 11:00 AM)',
      shippingAddress: '742 Evergreen Terrace, Springfield',
      returnStatus: 'NONE'
    }
  ]));
}

// State Accessors
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || SAMPLE_PRODUCTS;
}
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateNavCounters();
  renderMiniCart();
}
function getWalletBalance() {
  return parseFloat(localStorage.getItem('walletBalance') || '150');
}
function setWalletBalance(amount) {
  localStorage.setItem('walletBalance', amount.toFixed(2));
  updateNavCounters();
}

// Cart Actions
function addToCart(productId, qty = 1) {
  const products = getProducts();
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  let cart = getCart();
  const existing = cart.find(i => i.product.id === productId);
  if (existing) {
    existing.quantity += qty;
    existing.subtotal = existing.quantity * existing.product.price;
  } else {
    cart.push({
      product: prod,
      quantity: qty,
      subtotal: qty * prod.price
    });
  }
  saveCart(cart);
  showToast(`Added ${prod.name} to cart!`, 'success');
}

function updateCartQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.product.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.product.id !== productId);
    } else {
      item.subtotal = item.quantity * item.product.price;
    }
    saveCart(cart);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.product.id !== productId);
  saveCart(cart);
  showToast('Item removed from cart', 'info');
}

function clearCart() {
  saveCart([]);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
}

// Wishlist
function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from Wishlist', 'info');
  } else {
    wishlist.push(productId);
    showToast('Saved to Wishlist!', 'success');
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateNavCounters();
}

// Comparison Tray
function toggleCompare(productId, name) {
  let list = JSON.parse(localStorage.getItem('compareList') || '[]');
  const index = list.indexOf(productId);
  if (index > -1) {
    list.splice(index, 1);
    showToast(`Removed ${name} from comparison`, 'info');
  } else {
    if (list.length >= 3) {
      alert('You can compare up to 3 items at a time.');
      return;
    }
    list.push(productId);
    showToast(`Added ${name} to comparison!`, 'success');
  }
  localStorage.setItem('compareList', JSON.stringify(list));
  renderCompareDock();
}

function renderCompareDock() {
  const list = JSON.parse(localStorage.getItem('compareList') || '[]');
  let dock = document.getElementById('compareDock');
  if (!dock) return;

  if (list.length > 0) {
    dock.style.display = 'flex';
    document.getElementById('compareCount').innerText = list.length;
  } else {
    dock.style.display = 'none';
  }
}

// Mini Cart Drawer Toggle
function toggleMiniCart() {
  const drawer = document.getElementById('miniCartDrawer');
  const backdrop = document.getElementById('miniCartBackdrop');
  if (drawer && backdrop) {
    drawer.classList.toggle('open');
    backdrop.classList.toggle('open');
  }
}

function renderMiniCart() {
  const container = document.getElementById('miniCartItems');
  const totalEl = document.getElementById('miniCartTotal');
  if (!container || !totalEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="fas fa-shopping-basket fa-3x mb-3 text-muted"></i>
        <h6>Your cart is empty!</h6>
        <small>Add some fresh produce to see it here.</small>
      </div>`;
    totalEl.innerText = '$0';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="d-flex align-items-center justify-content-between py-2 border-bottom">
        <div class="d-flex align-items-center">
          <img src="${item.product.image}" alt="${item.product.name}" style="width: 45px; height: 45px; object-fit: contain;" class="mr-2 rounded">
          <div>
            <h6 class="font-weight-bold mb-0 text-truncate" style="max-width: 150px;">${item.product.name}</h6>
            <small class="text-muted">${item.quantity}x @ $${item.product.price}</small>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-success mr-2">$${item.subtotal}</span>
          <button class="btn btn-xs btn-outline-danger" onclick="removeFromCart(${item.product.id})">&times;</button>
        </div>
      </div>`;
  });
  container.innerHTML = html;
  totalEl.innerText = `$${getCartSubtotal()}`;
}

// Nav Counters Update
function updateNavCounters() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartBadges = document.querySelectorAll('.cart-badge-count');
  cartBadges.forEach(b => {
    b.innerText = count;
    b.style.display = count > 0 ? 'inline-block' : 'none';
  });

  const walletEls = document.querySelectorAll('.wallet-balance-val');
  walletEls.forEach(w => w.innerText = `$${getWalletBalance().toFixed(2)}`);

  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const wishBadges = document.querySelectorAll('.wishlist-badge-count');
  wishBadges.forEach(wb => {
    wb.innerText = wishlist.length;
    wb.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
  });
}

// Universal Dark / Light Theme
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
    icon.className = isDark ? 'theme-toggle-icon fas fa-sun text-warning' : 'theme-toggle-icon fas fa-moon';
  });
}

// Voice Search
function startVoiceSearch(inputSelector) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice search is not supported in this browser. Please use Chrome or Edge.');
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  showToast('🎙️ Listening... Speak fresh produce name now!', 'info');

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const input = document.querySelector(inputSelector);
    if (input) {
      input.value = transcript;
      showToast(`Searching for: "${transcript}"`, 'success');
      if (input.form) input.form.submit();
      else if (typeof applyFilters === 'function') applyFilters();
    }
  };
  recognition.start();
}

// Toast System
function showToast(msg, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.innerHTML = `<i class="fas fa-check-circle text-success mr-2"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// PWA Service Worker & Install Prompt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner && window.innerWidth <= 768) {
    banner.style.display = 'flex';
  }
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.style.display = 'none';
  } else {
    alert('To install on your phone:\n• Safari (iOS): Tap Share -> Add to Home Screen.\n• Chrome (Android): Tap 3-dots -> Add to Home Screen.');
  }
}

// Auto Init on Page Load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
  updateNavCounters();
  renderMiniCart();
  renderCompareDock();
});
