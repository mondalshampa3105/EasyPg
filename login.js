const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simple validation
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Fake login (store in localStorage)
  localStorage.setItem("user", JSON.stringify({ email }));

  alert("Login successful!");

  // Redirect to home page
  window.location.href = "index.html";
});