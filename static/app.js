// Firebase Configuration
const firebaseConfig = {
    apiKey: "*******************************",
    authDomain: "******************.firebaseapp.com",
    databaseURL: "https://******************.firebaseio.com",
    projectId: "******************",
    storageBucket: "******************.firebasestorage.app",
    messagingSenderId: "******************",
    appId: "******************",
    measurementId: "******************"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// DOM Elements
const employeeForm = document.getElementById("employee-form");
const keyForm = document.getElementById("key-form");
const accessKeyInput = document.getElementById("access-key");
const errorMessage = document.getElementById("error-message");

// ✅ Employee Registration - Store Data in Firebase
employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;

    // Generate a unique access key
    const accessKey = Math.random().toString(36).substr(2, 10);

    // Store data in Firebase
    const employeeRef = database.ref("employees").push();
    employeeRef.set({
        name: name,
        position: position,
        department: department,
        accessKey: accessKey,
        timestamp: new Date().toISOString()
    }).then(() => {
        // Store access key in localStorage
        localStorage.setItem("employeeKey", accessKey);
        localStorage.setItem("employeeName", name);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    }).catch(error => {
        console.error("Error storing data: ", error);
        alert("Failed to register. Try again!");
    });
});

// ✅ Employee Login - Verify Access Key
keyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const enteredKey = accessKeyInput.value.trim();

    database.ref("employees").orderByChild("accessKey").equalTo(enteredKey).once("value")
        .then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const employee = childSnapshot.val();
                    
                    // Store employee data locally
                    localStorage.setItem("employeeKey", enteredKey);
                    localStorage.setItem("employeeName", employee.name);

                    // Redirect to dashboard
                    window.location.href = "dashboard.html";
                });
            } else {
                errorMessage.textContent = "Invalid access key. Please try again!";
            }
        })
        .catch(error => {
            console.error("Error verifying key:", error);
        });
});

// ✅ Logout Functionality
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html";
});

// ✅ Load Employee Data on Dashboard
document.addEventListener("DOMContentLoaded", function () {
    const employeeName = localStorage.getItem("employeeName");
    if (employeeName) {
        document.getElementById("employeeName").textContent = employeeName;
    }
});
function registerEmployee() {
    console.log("Register button clicked!");
}
