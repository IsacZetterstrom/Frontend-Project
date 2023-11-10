import nodemailer from "nodemailer";

/**
 * @Author  Louise Johansson
 * @Descriptions model to send booking confirmation email using Nodemailer. The function takes in user specific booking details and the users email.
 */

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendBookingConfirmationEmail(bookingData, email) {
  // Format date string to swedish format
  const formattedDateTime = new Date(bookingData.dateAndTime).toLocaleString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Här kommer dina biobiljetter",
      html: `
        <html>
        <body>
          <h1 style="font-weight: bold;">Tack för din bokning</h1>
          <p>${bookingData.title}</p>
          <p>${formattedDateTime}</p>
          <p>Stolar: ${bookingData.seats}</p>
          <p>Salong: ${bookingData.saloon}</p>
          <p>${bookingData.priceSum} Kr</p>
          <p style="font-weight: bold; font-size: 20px;">Referens nummer: ${bookingData.bookingRef}</p>
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

export default { sendBookingConfirmationEmail };
