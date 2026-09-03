const API_URL = "https://project-alpha-oop-otters-game-backend.onrender.com";

const signupForm = document.getElementById("signup-form");
const messageBox = document.getElementById("message-box");

signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    messageBox.textContent = "Please enter a username and password";
    messageBox.style.color = "red";
    return;
  }

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${API_URL}/users/register`, options);

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = "Username already taken";
      messageBox.style.color = "red";
      return;
    }

    messageBox.textContent = "signp successful";
    messageBox.style.color= 'green'

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (err) {
    console.error(err);
    messageBox.textContent = "Network error";
    messageBox.style.color = "red";
  }
});
