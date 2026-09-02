const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById;

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputUserName = document.getElementById('login-username').value;
    const inputPassword = document.getElementById('login-password').value

    const userBase = JSON.parse(localStorage.getItem('fakeUser')) || [];

    const userFound = userBase.find(user => user.username === inputUserName)

    if (!userFound) {
        
    }
})