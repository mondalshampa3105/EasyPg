const container = document.getElementById("wishlist");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  container.innerHTML = `<p class="text-center text-red-500">Please login to view wishlist</p>`;
} else {

  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
  const saved = wishlistData[user.email] || [];

  if (saved.length === 0) {
    container.innerHTML = `<p class="text-center">No items in wishlist</p>`;
  }

  function createCard(item) {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <img src="${item.image}" class="w-full h-40 object-cover rounded"/>
      <h3 class="font-bold mt-2">${item.title}</h3>
      <p>${item.area}, ${item.location}</p>
      <p class="text-green-600">₹${item.price}</p>

      <button class="removeBtn mt-2 text-red-500">Remove</button>
    `;

    card.querySelector(".removeBtn").addEventListener("click", () => {
      let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
      let userWishlist = wishlistData[user.email] || [];

      userWishlist = userWishlist.filter(i => i.id !== item.id);

      wishlistData[user.email] = userWishlist;
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));

      location.reload();
    });

    return card;
  }

  saved.forEach(item => {
    container.appendChild(createCard(item));
  });
}