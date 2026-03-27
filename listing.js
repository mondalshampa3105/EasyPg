// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Get user
const user = JSON.parse(localStorage.getItem("user"));

// Combine default + user listings
const userListings = JSON.parse(localStorage.getItem("userListings")) || [];
const allListings = [...listings, ...userListings];

// Find the listing
const listing = allListings.find(item => item.id == id);

// Get container
const container = document.getElementById("details");

if (!listing) {
  container.innerHTML = `
    <h2 class="text-xl text-red-500">Listing not found</h2>
    <a href="index.html" class="text-blue-500 underline">Go back</a>
  `;
} else {

  // 🔥 FIX: define isOwner
  const isOwner = user && listing.ownerEmail === user.email;

  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || {};
  const userWishlist = user ? (wishlistData[user.email] || []) : [];

  const isSaved = userWishlist.some(i => i.id === listing.id);

  container.innerHTML = `
  <div class="space-y-4">

    <h1 class="text-3xl font-bold">${listing.title}</h1>

    <img src="${listing.image}" 
      class="w-full h-80 object-cover rounded-xl"/>

    <div class="flex justify-between items-center">
      <p class="text-gray-600">${listing.area}, ${listing.location}</p>
      <p class="text-green-600 font-bold text-lg">₹${listing.price}/month</p>
    </div>

    <div class="flex gap-3 text-sm">
      <span class="bg-blue-100 px-3 py-1 rounded">${listing.type}</span>
      <span class="bg-gray-200 px-3 py-1 rounded">${listing.gender}</span>
      <span>⭐ ${listing.rating}</span>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Amenities</h3>
      <div class="flex flex-wrap gap-2">
        ${listing.amenities.map(a => `
          <span class="bg-blue-100 px-2 py-1 rounded text-sm">
            ${a}
          </span>
        `).join("")}
      </div>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Description</h3>
      <p class="text-gray-700">${listing.description}</p>
    </div>

    <div class="flex gap-3 mt-4 flex-wrap">

      <button id="saveBtn" 
        class="px-4 py-2 rounded-lg text-white 
        ${isSaved ? "bg-green-600" : "bg-red-500"}">
        ${isSaved ? "❤️ Saved" : "🤍 Save"}
      </button>

      <button id="contactBtn" 
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Contact Owner
      </button>

      ${isOwner ? `
        <button id="deleteBtn"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Delete Listing
        </button>
      ` : ""}

    </div>

    <p id="contactInfo" class="mt-2 text-green-600 hidden">
      📞 Phone: 9876543210
    </p>

  </div>
  `;

  // CONTACT
  const contactBtn = document.getElementById("contactBtn");
  const contactInfo = document.getElementById("contactInfo");

  contactBtn.addEventListener("click", () => {
    contactInfo.classList.remove("hidden");
    contactBtn.innerText = "Number Shown";
    contactBtn.disabled = true;
  });

  // SAVE
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
      userWishlist = userWishlist.filter(i => i.id !== listing.id);
    } else {
      userWishlist.push(listing);
    }

    wishlistData[user.email] = userWishlist;
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));

    location.reload();
  });

  // 🔥 DELETE (inside block)
  const deleteBtn = document.getElementById("deleteBtn");

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {

      if (!confirm("Are you sure you want to delete this listing?")) return;

      let userListings = JSON.parse(localStorage.getItem("userListings")) || [];

      userListings = userListings.filter(i => i.id != listing.id);

      localStorage.setItem("userListings", JSON.stringify(userListings));

      alert("Listing deleted");
      window.location.href = "index.html";
    });
  }
}