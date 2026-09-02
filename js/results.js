function protectRoute(){
    const session = JSON.parse(localStorage.getItem("session"))
    if(!session || session.loggedIn){
        window.location.href = 'login.html'   
    }
}

protectRoute()
