const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: "student-portal-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    })
);

// Login page
app.get("/login", (req, res) => {
    res.render("login", {
        error: null
    });
});

// Login process
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Student login credentials
    if (username === "student" && password === "456") {

        req.session.isLoggedIn = true;
        req.session.username = username;

        // Create a custom cookie
        res.cookie("lastLogin", new Date().toLocaleTimeString(), {
            maxAge: 60000
        });

        res.redirect("/dashboard");

    } else {

        res.render("login", {
            error: "Invalid username or password!"
        });
    }
});

// Authentication middleware
const checkLogin = (req, res, next) => {

    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }
};

// Protected dashboard
app.get("/dashboard", checkLogin, (req, res) => {

    const lastLogin = req.cookies.lastLogin || "Not available";

    res.render("dashboard", {
        username: req.session.username,
        lastLogin: lastLogin
    });
});

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("lastLogin");
        res.redirect("/login");
    });
});

app.listen(port, () => {
    console.log(`Student Portal running at http://localhost:${port}/login`);
});