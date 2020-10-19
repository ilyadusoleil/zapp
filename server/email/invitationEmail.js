const email = require('./transporter');

const helloWorldEmail = (recipient, inviterName, projectName) => {
  console.log('invitation email getting called');
  const mailOptions = {
    from: process.env.EMAIL_ADD,
    to: recipient,
    subject: `You've been invited to Zapp!`,
    html: ` <div
    style="
      background-image: linear-gradient(to bottom right, #434190, #9f7aea);
    "
  >
    <h1>Welcome to Zapp!</h1>
  </div>
  <p>Hello, You've been invited to the project ${projectName} by ${inviterName}</p>
  <p>
    Click <a href="https://localhost:1234/">here</a> to sign up to Zapp and
    get started
  </p>`,
  };

  email.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent' + info.response);
      return true;
    }
  });
};

module.exports = helloWorldEmail;
