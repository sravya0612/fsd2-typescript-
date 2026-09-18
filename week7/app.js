const express = require("express");
const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Student Registration",
        error: null,
        user: null
    });
});

app.post("/register", (req, res) => {

    const { username, email, age } = req.body;

    let errorMessage = null;

    if (!username || username.length < 3) {
        errorMessage = "Username must contain at least 3 characters.";
    }
    else if (!email || !email.includes("@")) {
        errorMessage = "Please enter a valid email address.";
    }
    else if (!age || isNaN(age) || age < 18) {
        errorMessage = "Student must be at least 18 years old.";
    }

    if (errorMessage) {
        res.render("index", {
            title: "Registration Failed",
            error: errorMessage,
            user: null
        });
    }
    else {
        res.render("index", {
            title: "Registration Successful",
            error: null,
            user: username
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});