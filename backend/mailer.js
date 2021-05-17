import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'tolka43.test@gmail.com', pass: 'AKLDBWHS5' },
});

export function sendMail(userEmailAddress, name) {
  return transporter.sendMail({
    from: '"RELAX RESORT" <tolka43.test@gmail.com>',
    to: userEmailAddress,
    subject: 'dane rezerwacji',
    html: '<div style="color: blue">Pozdrowienia</div>',
  });
}