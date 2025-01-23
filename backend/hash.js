const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("aswin123#", 10);
console.log("Hashed Password:", hashedPassword);