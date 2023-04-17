var nodemailer = require("nodemailer");
const mail = (email, callback) => {
  console.log();
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.gmail.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    service: "gmail",
    auth: {
      user: "abhishek.niraj@iphtechnologies.com",
      pass: "niraj@75032",
    },
  });

  var mailOptions = {
    from: "abhisheknira133@gmail.com",
    to: "abhishekniraj456@gmail.com",
    subject: "Checking mail",
    text: `leave request`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log("Email Send successfully", info.response);
      callback(null, info.response);
    }
  });
};

module.exports = {
  mail,
};
