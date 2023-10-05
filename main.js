const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
// Fungsi untuk menampilkan/menutup sidebar keranjang
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('active');
}
// Fungsi untuk menampilkan/menutup sidebar menu
function toggleMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.querySelector('.sidebar');
    const isSidebarActive = sidebar.classList.contains('active');

    if (isSidebarActive) {
        // Mengganti ikon X menjadi ikon menu saat menutup sidebar
        menuIcon.setAttribute('data-feather', 'menu');
    } else {
        // Mengganti ikon menu menjadi ikon X saat membuka sidebar
        menuIcon.setAttribute('data-feather', 'x');
    }

    // Memanggil Feather Icons untuk memperbarui tampilan ikon
    feather.replace();

    // Memanggil fungsi toggleMenu() yang ada pada sidebar
    sidebar.classList.toggle('active');
}
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('active');
}


// Data produk aktual
const products = [
    { name: "SPICY BURGER", price: 10999, description:"", image: "img/burger.png" },
    { name: "SPICY HOTDOG", price: 12999, description:"", image: "img/hotdog.png" },
    { name: "SPICY SANDWICH", price: 10999, description:"",  image: "img/sandwich.png" },
    { name: "SPICY PIZZA", price: 30999, description:"",  image: "img/pizza.png" }
];

// Fungsi untuk menghasilkan kartu produk
function generateProductCards() {
    // Temukan elemen "products" di dalam dokumen HTML
    const productsSection = document.querySelector(".products");
    // Loop melalui produk dan buat kartu produk untuk setiap produk
    products.forEach((product, index) => {
        // Buat elemen kartu
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="view-details" data-bs-toggle="modal" data-bs-target="#productModal${index}">
            <h3>${product.name}</h3>
            <p>Rp.${product.price}</p>
            
            <div class="button-group">
                <button class="add-to-cart-btn" data-index="${index}">Tambah ke troli</button>
            </div>
        `;


        // Tambahkan kartu produk ke dalam elemen "products"
        productsSection.appendChild(card);
    });
}


// Inisialisasi kartu produk
generateProductCards();

// Fungsi untuk menginisialisasi keranjang belanja
function initializeCart() {
    // Temukan elemen-elemen yang diperlukan di dalam dokumen HTML
    const cartIcon = document.querySelector(".cart-icon");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const closeCartButton = document.querySelector(".close-cart");
    const checkoutButtonSidebar = document.querySelector(".checkout-btn");
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Inisialisasi variabel yang diperlukan
    let cartVisible = false;
    const cart = []; // Inisialisasi keranjang belanja

    // Fungsi untuk menampilkan atau menyembunyikan sidebar keranjang
    function toggleCartSidebar() {
        cartVisible = !cartVisible;
        if (cartVisible) {
            cartSidebar.classList.add("active");
        } else {
            cartSidebar.classList.remove("active");
        }
    }



    // Fungsi untuk menghitung total belanja
    function updateCartTotal() {
        const cartTotal = cart.reduce((total, item) => total + item.price, 0);
        cartTotalElement.textContent = cartTotal.toFixed(2);
    }

    // Fungsi untuk mengupdate jumlah ikon keranjang
    function updateCartIconCount() {
        const cartCount = document.querySelector(".cart-count");
        cartCount.textContent = cart.length;
    }

    // Fungsi untuk mereset jumlah ikon keranjang ke 0
    function resetCartIconCount() {
        const cartCount = document.querySelector(".cart-count");
        cartCount.textContent = "0";
    }

    // Fungsi untuk menghapus produk dari keranjang
    function removeProductFromCart(product) {
        const productIndex = cart.findIndex(item => item === product);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }
    }

    // Fungsi untuk menambahkan produk ke keranjang
    function addToCart(product) {
        cart.push(product);
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        const itemContent = document.createElement("div");
        itemContent.classList.add("cart-item-content");

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add("cart-item-image");

        const productName = document.createElement("span");
        productName.textContent = product.name;
        productName.classList.add("product-name");

        const productPrice = document.createElement("span");
        productPrice.textContent = "Rp." + product.price;
        productPrice.classList.add("product-price");

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("delete-icon", "ph", "ph-trash");
        deleteIcon.addEventListener("click", () => {
            removeProductFromCart(product);
            cartItem.remove();
            
            updateCartTotal();
            updateCartIconCount();
        });

        productInfo.appendChild(productImage);
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);

        itemContent.appendChild(productInfo);
        itemContent.appendChild(deleteIcon);

        cartItem.appendChild(itemContent);
        cartItemsList.appendChild(cartItem);

        updateCartTotal();
        updateCartIconCount();
    }

    // Ambil semua tombol "Add to Cart" dan tambahkan event listener untuk menambahkan produk ke keranjang
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            addToCart(products[index]);
        });
    });

    // Tambahkan event listener untuk tombol "Checkout" di sidebar
    checkoutButtonSidebar.addEventListener("click", () => {
        if (cart.length > 0) {
            // Panggil fungsi handleCheckout untuk menangani proses checkout
            handleCheckout(cart);
        } else {
            alert("Keranjang belanja Anda kosong. Silakan tambahkan produk ke keranjang.");
        }
    });
    // Inisialisasi jumlah ikon keranjang
    updateCartIconCount();


// Fungsi untuk menangani proses checkout
function handleCheckout(cart) {
    if (cart.length > 0) {
        // Hitung total harga
        const totalPrice = cart.reduce((total, product) => total + product.price, 0);
        
        localStorage.setItem("cartItems", JSON.stringify(cart));

        // Alihkan halaman ke URL WhatsApp dengan pesan yang sudah disiapkan
        window.location.href = `payment-metode/payment.html`;
    } else {
        alert("Keranjang belanja Anda kosong. Silakan tambahkan produk ke keranjang.");
    }
}

}
// Inisialisasi keranjang dan fungsionalitasnya
initializeCart();


// FUNGSI SEARCH BAR
// Ambil elemen input search bar
const searchInput = document.getElementById('searchInput');

// Event listener untuk menghandle input dalam search bar
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase(); // Ambil kata kunci pencarian dan ubah menjadi huruf kecil

    // Ambil semua elemen produk
    const productCards = document.querySelectorAll('.product-card');

    // Loop melalui setiap elemen produk
    productCards.forEach(function (productCard) {
        const productName = productCard.querySelector('h3').textContent.toLowerCase(); // Ambil nama produk dan ubah menjadi huruf kecil

        // Periksa apakah kata kunci pencarian ada dalam nama produk
        if (productName.includes(searchTerm)) {
            // Jika ada, tampilkan produk
            productCard.style.display = 'block';
        } else {
            // Jika tidak ada, sembunyikan produk
            productCard.style.display = 'none';
        }
    });
});
