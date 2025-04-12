const CustmoerModel = require("../Model/customerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Customer Registration
const custRegistration = async (req, res) => {
  const { name, address, city, contact, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Name, email, and password are required!" });
  }

  try {
    // Check if customer already exists
    const existingCustomer = await CustmoerModel.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ msg: "Email already registered!" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new customer
    const Customer = await CustmoerModel.create({
      name,
      address,
      city,
      contact,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: Customer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Service!",
      text: `Hi ${name},\n\nThank you for registering with us. We're excited to have you onboard!\n\nBest Regards,\nYour 🎮Team`,
    };

    // Send confirmation email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ msg: "You are successfully registered!", token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ msg: "An error occurred during registration!" });
  }
  console.log("Hashed Password:", hashedPassword); // Verify the hashed password

};

// Customer Login



const custLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ msg: "Email and password are required!" });
  }

  try {
    // Find the user in the database
    const Customer = await CustmoerModel.findOne({ email });
    console.log("Customer Found:", Customer);

    if (!Customer) {
      return res.status(400).send({ msg: "Invalid Email ID!" });
    }

    // Compare the provided password with the stored hashed password
    console.log("Received Password:", password);
    console.log("Stored Password:", Customer.password);

    const passwordMatch = await bcrypt.compare(password, Customer.password);
    console.log("Password Match Result:", passwordMatch);

    if (!passwordMatch) {
      return res.status(400).send({ msg: "Invalid Password!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: Customer._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      msg: "Login successful!",
      token,
      uname: Customer.name,
      uemail: Customer.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ msg: "An error occurred during login!" });
  }
};
// Customer Authentication
const custAuth = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken.id);
    const Customer = await CustmoerModel.findById(decodedToken.id).select("-password");

    console.log(Customer);

    res.status(200).send(Customer);

  } catch (error) {
    console.log(error);
  }
}

// Get Customer Data
const custGetData = async (req, res) => {
  const { userid } = req.query;

  try {
    const Customer = await CustmoerModel.findById(userid);
    res.status(200).send(Customer);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  custRegistration,
  custLogin,
  custAuth,
  custGetData,
};