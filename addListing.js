function addListing() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const newListing = {
    id: Date.now(),
    title: document.getElementById("title").value,
    location: document.getElementById("location").value,
    area: document.getElementById("area").value,
    price: Number(document.getElementById("price").value),
    image: document.getElementById("image").value || "https://via.placeholder.com/300",
    type: document.getElementById("type").value,
    gender: document.getElementById("gender").value,
    rating: 4.0,
    amenities: [],
    description: "User added listing",
    owner: user.email
  };

  const userListings = JSON.parse(localStorage.getItem("userListings")) || [];
  userListings.push(newListing);

  localStorage.setItem("userListings", JSON.stringify(userListings));

  alert("Listing added!");
  window.location.href = "index.html";
}