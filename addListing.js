function addListing() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  // Inputs
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const area = document.getElementById("area").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const type = document.getElementById("type").value;
  const gender = document.getElementById("gender").value;

  // 🔥 NEW
  const description = document.getElementById("description").value;
  const amenitiesInput = document.getElementById("amenities").value;

  const amenities = amenitiesInput
    ? amenitiesInput.split(",").map(a => a.trim())
    : [];

  // Validation
  if (!title || !location || !area || !price) {
    alert("Please fill all required fields");
    return;
  }

  const userListings = JSON.parse(localStorage.getItem("userListings")) || [];

  const newListing = {
    id: Date.now(),
    title,
    location,
    area,
    price: Number(price),
    image: image || "https://via.placeholder.com/300",
    type,
    gender,
    rating: 4.0,

    // ✅ FIXED
    amenities,
    description: description || "No description provided",

    ownerEmail: user.email
  };

  userListings.push(newListing);
  localStorage.setItem("userListings", JSON.stringify(userListings));

  alert("Listing added successfully!");
  window.location.href = "index.html";
}