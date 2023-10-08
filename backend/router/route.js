const express=require("express");
const route=express.Router();
const connection=require("../db/dbconnect");


route.post("/signup", (req, resp) => {
    const { fullName, email, password } = req.body;
    const query = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [fullName, email, password], (err, result) => {
        if (err) {
            console.error("Error during signup: " + err.message);
            resp.status(500).json({ message: "Signup failed" });
        } else {
            resp.status(201).json({ message: "Signup successful" });
        }
    });
});


route.post("/login", (req, resp) => {
    const { email, password } = req.body;

    
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error during login: " + err.message);
            resp.status(500).json({ message: "Login failed" });
        } else if (results.length === 0) {
            resp.status(401).json({ message: "Invalid credentials" });
        } else {
            const user = results[0];
            resp.status(200).json({ message: "Login successful", user });
        }
    });
});


route.get("/user/:userId", (req, resp) => {
    const userId = req.params.userId;

    const query = "SELECT * FROM users WHERE id = ?";
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error retrieving user data: " + err.message);
            resp.status(500).json({ message: "Error retrieving user data" });
        } else if (results.length === 0) {
            resp.status(404).json({ message: "User not found" });
        } else {
            const user = results[0];
            resp.status(200).json({ user });
        }
    });
});

module.exports=route;