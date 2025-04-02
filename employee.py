from flask import Flask, render_template, request, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask App
app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("employee-list-4de4e-firebase-adminsdk-fbsvc-58c34e8ca4.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Route for Employee Registration Page
@app.route("/")
def home():
    return render_template("employee.html")

# Route for Dashboard
@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

# Employee Registration
@app.route("/register", methods=["POST"])
def register():
    name = request.form.get("name")
    email = request.form.get("email")
    access_key = request.form.get("accessKey")

    if not name or not email or not access_key:
        return "All fields are required.", 400

    # Store employee data in Firestore
    db.collection("employees").document(email).set({
        "name": name,
        "email": email,
        "accessKey": access_key
    })

    return redirect(url_for("dashboard"))

# Employee Login
@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email")
    access_key = request.form.get("accessKey")

    if not email or not access_key:
        return "Please enter your email and access key.", 400

    user_ref = db.collection("employees").document(email).get()

    if not user_ref.exists or user_ref.to_dict()["accessKey"] != access_key:
        return "Invalid access key.", 401

    return redirect(url_for("dashboard"))

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5502)
