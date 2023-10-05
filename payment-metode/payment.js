// Fungsi untuk menampilkan formulir pembayaran
function showForm() {
  document.getElementById("formPelanggan").style.display = "block";
  document.getElementById("map").style.display = "none";
}

// Fungsi untuk menampilkan peta toko
function showMap() {
  document.getElementById("formPelanggan").style.display = "none";
  document.getElementById("map").style.display = "block";
  // Masukkan kode Google Maps di sini (gunakan iframe atau pustaka peta yang sesuai)
}

// Ambil produk yang disimpan dalam localStorage
const cartItems = JSON.parse(localStorage.getItem("cartItems"));

// Ambil elemen .cart-items untuk menampilkan produk
const cartItemsList = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");

// Kemudian, tampilkan produk pada halaman
if (cartItems && cartItems.length > 0) {
  let total = 0;

  cartItems.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rp.${item.price}</p>
        `;

    cartItemsList.appendChild(productItem);

    total += item.price;
  });

  totalPriceElement.textContent = `Total Harga: Rp.${total.toFixed(2)}`; // Tampilkan total harga di elemen
} else {
  alert("Keranjang belanja Anda kosong.");
}

// Event listener untuk tombol konfirmasi pembelian
const confirmPurchaseBtn = document.querySelector(".confirm-purchase-btn");
confirmPurchaseBtn.addEventListener("click", () => {
  const namaInput = document.getElementById("nama");
  const alamatInput = document.getElementById("alamat");
  const nomorHpInput = document.getElementById("nomor_hp");
  const kurirRadioButton = document.getElementById("kurir");
  const tokoRadioButton = document.getElementById("toko");

  if (
    namaInput.value.trim() === "" ||
    alamatInput.value.trim() === "" ||
    nomorHpInput.value.trim() === ""
  ) {
    alert("Harap isi semua informasi pelanggan terlebih dahulu.");
    return;
  }

  // Mendapatkan metode pengiriman yang dipilih
  let metodePengiriman;
  if (kurirRadioButton.checked) {
    metodePengiriman = "Kirim lewat kurir";
  } else if (tokoRadioButton.checked) {
    metodePengiriman = "Kunjungi toko";
  } else {
    alert("Harap pilih metode pengiriman terlebih dahulu.");
    return;
  }

  // Menghitung total harga (di sini saya letakkan di luar forEach)
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });

  // Konstruksi pesan WhatsApp dengan informasi pelanggan, metode pengiriman, produk, dan total harga
  let pesanWhatsApp = `Halo, Saya ingin melakukan pembelian dengan detail sebagai berikut:\n\n`;
  pesanWhatsApp += `Nama: ${namaInput.value}\n`;
  pesanWhatsApp += `Alamat: ${alamatInput.value}\n`;
  pesanWhatsApp += `Nomor HP: ${nomorHpInput.value}\n\n`;
  pesanWhatsApp += `Metode Pengiriman: ${metodePengiriman}\n\n`;

  pesanWhatsApp += `Produk yang dibeli:\n`;
  cartItems.forEach((item) => {
    pesanWhatsApp += `${item.name} - Rp.${item.price}\n`;
  });

  // Menambahkan total harga ke pesan WhatsApp
  pesanWhatsApp += `Total Harga: Rp.${total.toFixed(2)}\n`;

  // Menambahkan metode pembayaran melalui Dana
  pesanWhatsApp += `Metode Pembayaran: Dana\n\n`;
  pesanWhatsApp += `"Silahkan kirim bukti pembayaran lewat whatsapp secca food"\n\n`;

  pesanWhatsApp += `hati-hati penipuan yang mengatas nama kan secca food`;

  // Ganti dengan nomor WhatsApp yang sesuai
  const nomorWhatsApp = "+6289691213179"; // Ganti dengan nomor WhatsApp Anda

  // Encode pesan WhatsApp untuk URL
  pesanWhatsApp = encodeURIComponent(pesanWhatsApp);

  // Konstruksi URL WhatsApp
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${pesanWhatsApp}`;

  // Alihkan ke URL WhatsApp
  window.location.href = urlWhatsApp;
  {
    console.log("Error");
  }
});

// Event listener untuk tombol konfirmasi pembelian ke lokasi// ...
// Event listener untuk tombol "Konfirmasi Pembelian" di dalam div dengan ID "map"
const confirmPurchaseMapBtn = document.querySelector(
  "#map .confirm-purchase-btn"
);
confirmPurchaseMapBtn.addEventListener("click", () => {
  const kurirRadioButton = document.getElementById("kurir");
  const tokoRadioButton = document.getElementById("toko");

  // Mendapatkan metode pengiriman yang dipilih
  let metodePengiriman;
  if (kurirRadioButton.checked) {
    metodePengiriman = "Kirim lewat kurir";
  } else if (tokoRadioButton.checked) {
    metodePengiriman = "Kunjungi toko";
  } else {
    alert("Harap pilih metode pengiriman terlebih dahulu.");
    return;
  }
  // Menghitung total harga (di sini saya letakkan di luar forEach)
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
  });

  // Konstruksi pesan WhatsApp dengan informasi pelanggan, metode pengiriman, produk, dan total harga
  let pesanWhatsApp = `Halo, Saya ingin melakukan pemesanan dengan detail sebagai berikut:\n\n`;

  pesanWhatsApp += `Produk yang dibeli:\n`;
  cartItems.forEach((item) => {
    pesanWhatsApp += `${item.name} - Rp.${item.price}\n`;
  });

  // Menambahkan total harga ke pesan WhatsApp
  pesanWhatsApp += `Total Harga: Rp.${total.toFixed(2)}\n\n`;

  // Menambahkan metode pengiriman
  pesanWhatsApp += `Metode Pengiriman: Kunjungi Toko\n\n`;
  pesanWhatsApp += `hati-hati penipuan yang mengatas nama kan secca food`;

  // Ganti dengan nomor WhatsApp yang sesuai
  const nomorWhatsApp = "+6289691213179"; // Ganti dengan nomor WhatsApp Anda

  // Encode pesan WhatsApp untuk URL
  pesanWhatsApp = encodeURIComponent(pesanWhatsApp);

  // Konstruksi URL WhatsApp
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${pesanWhatsApp}`;

  // Alihkan ke URL WhatsApp
  window.location.href = urlWhatsApp;
});
