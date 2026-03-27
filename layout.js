function loadNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  let rightSection = "";

  if (user) {
    rightSection = `
      <a href="add-listing.html" class="text-gray-600 hover:text-blue-600">Add Listing</a>
      <a href="profile.html" class="text-gray-600 hover:text-blue-600">Profile</a>

      <span class="text-gray-700">Hi, <b>${user.name}</b></span>

      <button id="logoutBtn" 
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    `;
  } else {
    rightSection = `
      <a href="login.html" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Login
      </a>
    `;
  }

  const navbar = `
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-3 flex justify-between items-center">
      
      <h1 class="text-2xl font-bold text-blue-600 cursor-pointer" onclick="goHome()">
        EasyPG
      </h1>

      <div class="flex gap-6 items-center">
        <a href="index.html" class="text-gray-600 hover:text-blue-600">Home</a>
        <a href="about.html" class="text-gray-600 hover:text-blue-600">About</a>
        <a href="contact.html" class="text-gray-600 hover:text-blue-600">Contact</a>
        ${rightSection}
      </div>

    </nav>
  `;

  document.getElementById("navbar").innerHTML = navbar;

  // Logout event
  if (user) {
    const btn = document.getElementById("logoutBtn");
    if (btn) {
      btn.addEventListener("click", logout);
    }
  }
}

function loadFooter() {
  const footer = `
    <footer class="bg-gray-900 text-white mt-16 px-6 py-10">
      
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Brand -->
        <div>
          <h2 class="text-xl font-bold text-blue-400">EasyPG</h2>
          <p class="mt-2 text-gray-400">
            Find verified PGs and flats without brokers. Safe, simple, and student-friendly.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-semibold mb-2">Quick Links</h3>
          <ul class="space-y-1 text-gray-400">
            <li><a href="index.html" class="hover:text-white">Home</a></li>
            <li><a href="about.html" class="hover:text-white">About</a></li>
            <li><a href="contact.html" class="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <!-- Extra -->
        <div>
          <h3 class="font-semibold mb-2">Features</h3>
          <p class="text-gray-400">✔ No Broker</p>
          <p class="text-gray-400">✔ Verified Listings</p>
          <p class="text-gray-400">✔ Student Friendly</p>
        </div>

      </div>

      <div class="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © 2026 EasyPG. All rights reserved.
      </div>

    </footer>
  `;

  document.getElementById("footer").innerHTML = footer;
}

function goHome() {
  window.location.href = "index.html";
}