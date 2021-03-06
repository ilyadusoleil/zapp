const email = require('./transporter');

const sendInvitationEmail = (
  recipient,
  inviterName,
  projectName,
  projectId
) => {
  const mailOptions = {
    from: process.env.EMAIL_ADD,
    to: recipient,
    subject: `You've been invited to a new project!`,
    attachments: [
      {
        filename: 'zappcopy.png',
        path: `${__dirname}/../assets/zappcopy.png`,
        cid: 'logo',
      },
    ],
    html: `

  <table style="width: 100%">
      <tr
        style="
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          width: 100%;
          height: 175px;
          position: absolute;
          background-image: linear-gradient(to bottom right, #2c7a7b, #4fd1c5);
          border-bottom-left-radius: 50% 20%;
          border-bottom-right-radius: 50% 20%;
          filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.6));
        "
      >
        <td>
          <div
            style="
              display: flex;
              padding-bottom: 50px;
              font-family: Tahoma;
              font-size: 80px;
              color: white;
              padding-left: 5%;
              padding-right: 5%;
            "
          >
            <img
              style="padding-top: 10px; height: 80px; padding-right: 30px"
              src="cid:logo"
            />
            <div>Zapp</div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style="
              justify-content: center;
              font-family: Verdana;
            "
          >
            <div style="padding-left: 10%; padding-right: 10%">
            <h1>Hello!</h1>
            <h1>You have been invited to a project on Zapp</h1>
                <p style="padding-top: 20px">
                  Zapp is an app for managing issues in the software development
                  lifecycle.
                </p>
                <p style="padding-top: 20px">
                  Zapp is designed with small teams in mind and aims to make issue
                  tracking simple and straightforward.
                </p>
                <h3 style="padding-top: 60px">
                  You've been invited to the project ${projectName} by
                  ${inviterName}
                </h3>
                <h3 style="padding-top: 20px">
                  Click <a href="${process.env.HOMEPAGE}/${projectId}">here</a> to view the project.
                </h3>
            </div>
          </div>
        </td>
      </tr>
    </table>

    `,
  };

  email.sendMail(mailOptions, function (error, info) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    } else {
      // eslint-disable-next-line no-console
      console.log('Email sent' + info.response);
      return true;
    }
  });
};

module.exports = sendInvitationEmail;
