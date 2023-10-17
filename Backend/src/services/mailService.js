import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendBookingConfirmationEmail(bookingData) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      subject: "Här kommer dina biobiljetter",
      html: `
        <html>
        <body>
          <h1 style="font-weight: bold;">Tack för din bokning</h1>
          <p>${bookingData.movie}</p>
          <p>${bookingData.screeningDate}, ${bookingData.screeningStartTime}</p>
          <p>Stolar: ${bookingData.seats}</p>
          <p>Salong: ${bookingData.saloon}</p>
          <p>${bookingData.price}</p>
          <p style="font-weight: bold; font-size: 20px;">Referens nummer: ${bookingData.RefNumber}</p>
        </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info.response);
      }
    });
  });
}

export { sendBookingConfirmationEmail };
