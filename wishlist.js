const wishlistContainer = document.getElementById("wishlist");

const user = JSON.parse(localStorage.getItem("user"));
console.log("wishlist.js loaded");
if (!user) {
  wishlistContainer.innerHTML = `<p class="text-center text-red-500">Please login to view wishlist</p>`;
} else {
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
  const saved = wishlistData[user.email] || [];

  if (saved.length === 0) {
    wishlistContainer.innerHTML = `<p class="text-center">No items in wishlist</p>`;
  } else {
    saved.forEach(item => {
      wishlistContainer.appendChild(createCard(item, { showRemove: true }));
    });
  }
}