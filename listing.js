const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const listing = listings.find(item => item.id == id);

const container = document.getElementById("details");

container.innerHTML = `
  <h1>${listing.title}</h1>
  <img src="${listing.image}" style="width:100%; max-width:500px;" />
  
  <p><b>Location:</b> ${listing.area}, ${listing.location}</p>
  <p><b>Price:</b> ₹${listing.price}/month</p>
  <p><b>Rating:</b> ⭐ ${listing.rating}</p>
  <p><b>Type:</b> ${listing.type}</p>
  <p><b>Gender:</b> ${listing.gender}</p>
  
  <p><b>Amenities:</b> ${listing.amenities.join(", ")}</p>

  <p>${listing.description}</p>

  <button>Contact Owner</button>
`;