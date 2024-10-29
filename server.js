const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use("/", express.static("./public"));

app.listen(1234, () => {
  console.log("server started");
});

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace this with your own email address
const siteOwnersEmail = "suvvarilohita@gmail.com";

// New route for /data
app.get("/data", (req, res) => {
  res.status(200).send("OK");
});

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const {
    name,
    email,
    subject = "Contact Form Submission",
    message,
  } = req.body;
  let errors = [];
  console.log({
    name,
    email,
    message,
    name: !name || name.length < 2,
    mail: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    msg: !message || message.length < 15,
  });
  // Input validation
  if (!name || name.length < 2) {
    errors.push("Please enter your name.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!message || message.length < 15) {
    errors.push(
      "Please enter your message. It should have at least 15 characters."
    );
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: siteOwnersEmail, // Your email
      pass: "ihatefacebook", // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: siteOwnersEmail,
    subject: subject,
    html: `
      <p>Email from: ${name}</p>
      <p>Email address: ${email}</p>
      <p>Message:</p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr />
      <p>This email was sent from your site's contact form.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
