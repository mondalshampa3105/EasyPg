// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Get user
const user = JSON.parse(localStorage.getItem("user"));

// Combine default + user listings (IMPORTANT)
const userListings = JSON.parse(localStorage.getItem("userListings")) || [];
const allListings = [...listings, ...userListings];

// Find the listing
const listing = allListings.find(item => item.id == id);

// Get container
const container = document.getElementById("details");

// If listing not found
if (!listing) {
  container.innerHTML = `
    <h2 class="text-xl text-red-500">Listing not found</h2>
    <a href="index.html" class="text-blue-500 underline">Go back</a>
  `;
} else {

  // Get wishlist data
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
  const userWishlist = user ? (wishlistData[user.email] || []) : [];

  const isSaved = userWishlist.some(i => i.id === listing.id);

  container.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">${listing.title}</h1>

    <img src="${listing.image}" class="w-full h-80 object-cover rounded-lg mb-4"/>

    <p class="text-gray-600 mb-2"><b>Location:</b> ${listing.area}, ${listing.location}</p>
    <p class="text-green-600 font-bold mb-2">₹${listing.price}/month</p>
    <p class="mb-2">⭐ ${listing.rating}</p>

    <p class="mb-2"><b>Type:</b> ${listing.type}</p>
    <p class="mb-2"><b>Gender:</b> ${listing.gender}</p>

    <div class="mb-3">
      <b>Amenities:</b>
      <div class="flex flex-wrap gap-2 mt-2">
        ${listing.amenities.map(a => `
          <span class="bg-blue-100 px-2 py-1 rounded text-sm">
            ${a}
          </span>
        `).join("")}
      </div>
    </div>

    <p class="mb-4">${listing.description}</p>

    <!-- ❤️ Save Button -->
    <button id="saveBtn" 
      class="mb-4 px-4 py-2 rounded-lg text-white 
      ${isSaved ? "bg-green-600" : "bg-red-500"}">
      ${isSaved ? "❤️ Saved" : "🤍 Save"}
    </button>

    <!-- Contact -->
    <button id="contactBtn" 
      class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Contact Owner
    </button>

    <p id="contactInfo" class="mt-3 text-green-600 hidden">
      📞 Phone: 9876543210
    </p>
  `;

  // 🔥 CONTACT BUTTON
  const contactBtn = document.getElementById("contactBtn");
  const contactInfo = document.getElementById("contactInfo");

  contactBtn.addEventListener("click", () => {
    contactInfo.classList.remove("hidden");
    contactBtn.innerText = "Number Shown";
    contactBtn.disabled = true;
  });

  // 🔥 SAVE BUTTON
  const saveBtn = document.getElementById("saveBtn");

  saveBtn.addEventListener("click", () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
    let userWishlist = wishlistData[user.email] || [];

    const exists = userWishlist.find(i => i.id === listing.id);

    if (exists) {
      // REMOVE
      userWishlist = userWishlist.filter(i => i.id !== listing.id);
    } else {
      // ADD
      userWishlist.push(listing);
    }

    wishlistData[user.email] = userWishlist;
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));

    // 🔥 Update UI instantly
    location.reload();
  });
}