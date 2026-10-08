const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new sqlite3.Database("college_students.db");

db.run(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT,
        email TEXT,
        branch TEXT,
        mobile_no TEXT
    )
`);

app.post("/register", (req, res) => {

    const fn = req.body.full_name;
    const em = req.body.email;
    const br = req.body.branch;
    const mob = req.body.mobile_no;

    db.run(
        `INSERT INTO students
        (full_name, email, branch, mobile_no)
        VALUES (?, ?, ?, ?)`,
        
        [fn, em, br, mob],

        (err) => {
            if (err) {
                console.log(err);
                res.send("Error Saving Data");
            } else {
                res.send("Success!! Data Saved");
            }
        }
    );
});

// Start server
app.listen(3000, () => {
    console.log("Server is Running at Post");
});