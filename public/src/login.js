function attemptLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    authUser(email, password)
        .then((result) => {
            if (result.isAuthenticated) {
                console.log(result);
                loadDashboardPage(result.userName);
            } else {
                alert("Login Failed.");
            }
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
}

function authUser(email, password) {
    // Return a promise
    return new Promise((resolve, reject) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .then((userCredential) => {
                resolve({ isAuthenticated: true, userName: userCredential.user.displayName });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                resolve(false);
            });
    });
}

function signOut() {
    firebase.auth().signOut().then(() => { })
    loadLoginPage()
}