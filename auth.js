function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!name || !email || !password) {
    error.innerText = "Please fill all fields";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existing = users.find(u => u.email === email);
  if (existing) {
    error.innerText = "User already exists";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!email || !password) {
    error.innerText = "Please fill all fields";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    error.innerText = "Invalid credentials";
    return;
  }

  // Save logged in user
  localStorage.setItem("user", JSON.stringify(user));

  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}