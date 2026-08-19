const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
        status: "Active"
    });
});

/* Sending real world data */
app.get("/todotasks", (req, res) => {

    const todoArr = [{
        id: 1,
        title: "learn express",
        tags: ['nodejs', "express"]
    }, {
        id: 2,
        title: "learn web dev",
        tags: ['nodejs', "express", "react"]
    }];

    res.json(todoArr);
});

/* Dynamic JSON response */
app.get("/todos/:id", (req, res) => {

    const todoId = req.params.id;

    res.json({
        requestedId: todoId,
        tags: ["node.js", "express"],
        message: "Todo fetched successfully!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});