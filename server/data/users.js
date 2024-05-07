import bcrypt from "bcryptjs";

const users = [
  {
    name: "Zainab Usama",
    email: "zaynabusama15@gmail.com",
    password: bcrypt.hashSync("1602041528", 10),
    isAdmin: true,
  },
  {
    name: "Aiman Zahoor",
    email: "aims.zahoor@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;