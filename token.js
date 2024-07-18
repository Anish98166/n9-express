import jwt from "jsonwebtoken";

let infoObj = {
  id: "1234",
};

let secretKey = "n9solution";

//expiry info must be in same format
let expiryDate = {
  expiresIn: "1d",
};

//Generate Token
let token = jwt.sign(infoObj, secretKey, expiryDate);
console.log(token);

//Verify Token
let token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJpYXQiOjE3MjA1MDUwMzUsImV4cCI6MTcyMDU5MTQzNX0.16mfnfOvhIE0fb83CRBeZOifAWaeQswt0OPE5r036HE";

try {
  let infoObj = jwt.verify(token1, "n9solution");
  console.log(infoObj);
} catch (error) {
  console.log(error.message);
}
