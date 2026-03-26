const container = document.getElementById("listings");
const searchInput = document.getElementById("search");

function createCard(item) {
  const card = document.createElement("div");

  card.className = `
    bg-white rounded-xl shadow-md overflow-hidden cursor-pointer 
    hover:shadow-xl hover:scale-105 transition duration-300
  `;

  card.innerHTML = `
    <img src="${item.image}" class="w-full h-48 object-cover" />

    <div class="p-4">
      <h3 class="font-semibold text-lg">${item.title}</h3>
      <p class="text-gray-500 text-sm">${item.area}, ${item.location}</p>

      <p class="text-green-600 font-bold mt-2">₹${item.price}/month</p>

      <div class="flex justify-between items-center mt-2 text-sm">
        <span>⭐ ${item.rating}</span>
        <span class="text-blue-500">${item.type}</span>
      </div>

      <p class="text-xs text-gray-500 mt-1">${item.gender}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    window.location.href = `listing.html?id=${item.id}`;
  });

  return card;
}

function displayListings(data) {
  container.innerHTML = "";
  data.forEach(item => {
    container.appendChild(createCard(item));
  });
}

// Initial Load
displayListings(listings);

// Search functionality (city + area)
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = listings.filter(item =>
    item.location.toLowerCase().includes(value) ||
    item.area.toLowerCase().includes(value)
  );

  displayListings(filtered);
});