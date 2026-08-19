const express = require('express');

const app = express();

app.use(express.json());

let students = [{
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
}, {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com"
}];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        ...req.body
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.put("/student/:id", (req, res) => {

    const studentId = parseInt(req.params.id);

    const student = students.find(
        (student) => student.id === studentId
    );

    if (student) {

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;

        res.json({
            message: "Student updated successfully",
            student: student
        });

    } else {

        res.status(404).json({
            message: "Student not found"
        });
    }
});

app.delete("/student/:id", (req, res) => {

    const studentId = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === studentId
    );

    if (studentIndex != -1) {

        students.splice(studentIndex, 1);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } else {

        res.status(404).json({
            message: "Student not found"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});