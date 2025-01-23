const bcrypt = require("bcryptjs");

const storedHash = "$2a$10$CHT4zgQUhL6ND.MzG6.QZe/1jQWCvlgzZsk.JafuB4uHUp/pUV8Hm"; // Example hash
const inputPassword = "vimal123%"; // User's plain-text password

bcrypt.compare(inputPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error("Error:", err);
  } else if (isMatch) {
    console.log("Password is correct!");
  } else {
    console.log("Invalid password!");
  }
});
