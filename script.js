// Elements (may not exist on all pages)
const container = document.getElementById("listings");
const searchInput = document.getElementById("search");

// Data
const userListings = JSON.parse(localStorage.getItem("userListings")) || [];
const allListings = [...listings, ...userListings];

// 🔥 REUSABLE CARD FUNCTION
function createCard(item, options = {}) {
  const card = document.createElement("div");

  const user = JSON.parse(localStorage.getItem("user"));
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
  const userWishlist = user ? (wishlistData[user.email] || []) : [];

  const isSaved = userWishlist.some(i => i.id === item.id);

  card.className = `
    bg-white rounded-xl shadow-md overflow-hidden cursor-pointer 
    hover:shadow-xl hover:scale-105 transition duration-300
  `;

 card.innerHTML = `
  <div class="relative">
    <img src="${item.image}" class="w-full h-48 object-cover" />

    <!-- ❤️ Save Button (top-right) -->
    ${
      !options.showRemove
        ? `<button class="saveBtn absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow">
            ${isSaved ? "❤️" : "🤍"}
           </button>`
        : ""
    }
  </div>

  <div class="p-4">
    <!-- Title -->
    <h3 class="font-semibold text-lg line-clamp-1">${item.title}</h3>

    <!-- Location -->
    <p class="text-gray-500 text-sm">${item.area}, ${item.location}</p>

    <!-- Description preview -->
    <p class="text-sm text-gray-600 mt-2 line-clamp-2">
      ${item.description || "No description available"}
    </p>

    <!-- Price -->
    <p class="text-green-600 font-bold mt-2">₹${item.price}/month</p>

    <!-- Info row -->
    <div class="flex justify-between items-center mt-2 text-sm">
      <span>⭐ ${item.rating}</span>
      <span class="text-blue-500 font-medium">${item.type}</span>
    </div>

    <!-- Gender + Owner -->
    <div class="flex justify-between items-center mt-2">
      <span class="text-xs text-gray-500">${item.gender}</span>

      ${
        item.ownerEmail
          ? `<span class="text-xs bg-yellow-100 px-2 py-1 rounded">
               Owner
             </span>`
          : ""
      }
    </div>

    ${
      options.showRemove
        ? `<button class="removeBtn mt-3 w-full text-red-500 border border-red-400 py-1 rounded hover:bg-red-50">
             Remove
           </button>`
        : ""
    }
  </div>
`;

  // 👉 Open details
  card.addEventListener("click", () => {
    window.location.href = `listing.html?id=${item.id}`;
  });

  // 👉 SAVE BUTTON (Home page)
  if (!options.showRemove) {
    const saveBtn = card.querySelector(".saveBtn");

    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (!user) {
          alert("Please login first");
          return;
        }

        let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
        let userWishlist = wishlistData[user.email] || [];

        const exists = userWishlist.find(i => i.id === item.id);

        if (exists) {
          userWishlist = userWishlist.filter(i => i.id !== item.id);
        } else {
          userWishlist.push(item);
        }

        wishlistData[user.email] = userWishlist;
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));

        location.reload();
      });
    }
  }

  // 👉 REMOVE BUTTON (Wishlist page)
  if (options.showRemove) {
    const removeBtn = card.querySelector(".removeBtn");

    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
        let userWishlist = wishlistData[user.email] || [];

        userWishlist = userWishlist.filter(i => i.id !== item.id);

        wishlistData[user.email] = userWishlist;
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));

        location.reload();
      });
    }
  }

  return card;
}

// 🔥 DISPLAY FUNCTION
function displayListings(data) {
  if (!container) return; // prevent crash

  container.innerHTML = "";
  data.forEach(item => {
    container.appendChild(createCard(item));
  });
}

// 🔥 INITIAL LOAD (only for home page)
if (container) {
  displayListings(allListings);
}

// 🔥 SEARCH (only if input exists)
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allListings.filter(item =>
      item.location.toLowerCase().includes(value) ||
      item.area.toLowerCase().includes(value)
    );

    displayListings(filtered);
  });
}