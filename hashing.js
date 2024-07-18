//Hashing
import bcrypt from "bcrypt";

//Generate hash code
let Password = "Password@123";
let hashedPassword = await bcrypt.hash(Password, 10);
console.log(hashedPassword);

//Compare hash code

let loginPassword = "Password@123";
let isvalidPassword = await bcrypt.compare(loginPassword, hashedPassword);
console.log(isvalidPassword);
