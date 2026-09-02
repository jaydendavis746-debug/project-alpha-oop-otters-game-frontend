const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box')

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newUserName = document.getElementById('username').value;
    const newPassword = document.getElementById('password').value;

    let userBase = JSON.parse(localStorage.getItem('fakeUsers')) || [];

    const userExists = userBase.find(user => user.username === newUserName);

    if(userExists) {
        messageBox.textContent = "Username already taken";
        messageBox.style.color = "red";
        return;
    }

    const newUser = {
        username: newUserName,
        password: newPassword
    };

    userBase.push(newUser)

    localStorage.setItem('fakeUsers', JSON.stringify(userBase))

    //messageBox.textContent = "Sign up Successful!"

    setTimeout(() => {
        window.location.href = 'login.html'
    }, 1500)

});