const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

var db = new sqlite3.Database("Test.db");

try {
  db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS Users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL
            )
          `);
    db.run("INSERT INTO Users (name) VALUES ('Mark Essien')");
  });
} catch (error) {
  console.log(error);
}

// Function to validate a string
function isString(value) {
  return typeof value === "string";
}

// Define routes for CRUD operations

// CREATE: Adding a new person
app.post("/api", (req, res) => {
  const { name } = req.body;
  if (!name || !isString(name)) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  const insertQuery = "INSERT INTO Users (name) VALUES (?)";
  const values = [name];

  db.run(insertQuery, values, function (err) {
    if (err) {
      console.error("Error creating person:", err);
      return res
        .status(500)
        .json({ error: "An error occurred, failed to create new user" });
    }

    res
      .status(201)
      .json({ message: "User created successfully", id: this.lastID, name });
  });
});

// READ: Fetching details of a person by ID
app.get("/api/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM Users WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching person:", err);
      return res
        .status(500)
        .json({ error: "An error occurred, failed to fetch user details" });
    }

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(row);
  });
});

// UPDATE: Modifying details of an existing person
app.put("/api/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !isString(name)) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  db.run("UPDATE Users SET name = ? WHERE id = ?", [name, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to update user details" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
});

// Remove a person by ID
app.delete("/api/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM Users WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to remove user" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User removed successfully" });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
