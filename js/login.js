const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputUserName = document.getElementById('login-username').value;
    const inputPassword = document.getElementById('login-password').value

    const userBase = JSON.parse(localStorage.getItem('fakeUsers')) || [];

    const userFound = userBase.find(user => user.username === inputUserName)

    if (!userFound) {
        loginMessage.textContent = "Username not found. Please sign up.";
        return;
    }

    if (userFound.password !== inputPassword) {
        loginMessage.textContent = "Incorrect Password."
        return;
    }

    loginMessage.textContent = "Login Success"

    localStorage.setItem('currentUser', JSON.stringify ({
        username: userFound.username
    }));

    console.log("successful")
    setTimeout(() => {
    window.location.href = '/pages/subjects.html';
    }, 1000);
})