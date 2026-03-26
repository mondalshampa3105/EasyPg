const container = document.getElementById("listings");
const searchInput = document.getElementById("search");

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.image}" />
    <div class="card-content">
      <h3>${item.title}</h3>
      <p>${item.area}, ${item.location}</p>
      <p class="price">₹${item.price}/month</p>
      <p>⭐ ${item.rating}</p>
      <p>${item.gender} • ${item.type}</p>
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