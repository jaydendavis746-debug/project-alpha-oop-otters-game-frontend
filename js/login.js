const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById;

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputUserName = document.getElementById("login-username").value;
  const inputPassword = document.getElementById("login-password").value;

  const userBase = JSON.parse(localStorage.getItem("fakeUser")) || [];

  const userFound = userBase.find((user) => user.username === inputUserName);

  if (!userFound) {
    alert("User not found");
    return;
  }

  if (userFound.password !== inputPassword) {
    alert("Incorrect password");
    return;
  }

  localStorage.setItem(
    "session",
    JSON.stringify({
      loggedIn: true,
      username: userFound.username,
    }),
  );

  window.location.href = "subjects.html";
});
