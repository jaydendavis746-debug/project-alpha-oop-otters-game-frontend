const API_URL = "https://project-alpha-oop-otters-game-backend.onrender.com";

const loginForm = document.getElementById("login-form");
const messageBox = document.getElementById("login-message");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    messageBox.textContent = "Please enter your username and password";
    messageBox.style.color = "red";
    return;
  }

  try {
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${API_URL}/users/login`, options);
    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = "Invalid username and password";
      messageBox.style.color = "red";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id", data.user.user_id)
    localStorage.setItem("username", data.user.username);

    messageBox.textContent = "Login successful";
    messageBox.style.color = "green";

    window.location.href = "subjects.html";
  } catch (err) {
    console.error(err);
    messageBox.textContent = "Server error";
    messageBox.style.color = "red";
  }
});
