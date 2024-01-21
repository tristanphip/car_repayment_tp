document.addEventListener('DOMContentLoaded', () => {
    const user = firebase.auth().currentUser;
    if (user) {
        loadDashboardPage(user.displayName);
    } else {
        loadLoginPage();
    }
});

function loadLoginPage() {
    updateStylesheet('styles_login.css');
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
            particlesJS.load('particles-js', 'src/particles.json', function () {
                console.log('callback - particles.js config loaded');
            });
        });
}

function loadDashboardPage(username) {
    const user = firebase.auth().currentUser;
    if (user) {
        updateStylesheet('styles_dash.css');
        fetch('dashboard.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('app').innerHTML = html;
                document.getElementById('userName').innerHTML = "Welcome, " + username + ".";
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('paymentDate').value = today;
                fetchDataAndGenerateTable();
            });
    } else {
        alert("Unauthorised!");
    }
}

function updateStylesheet(stylesheet) {
    const stylesheetLink = document.getElementById('stylesheet');
    stylesheetLink.href = `${stylesheet}`;
}