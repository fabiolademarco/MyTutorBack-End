// Import dotenv
const dotenv = require('dotenv');
// Configure dotenv
dotenv.config();

const nodemailer = require('nodemailer');
const template = require('../static/template-emails.json');
const user = {
  email: 'noreply.mytutor@gmail.com', // Si potrebbero mettere nel .env
  password: 'MyTutorPassword',
};
const domain = 'localhost:3000'; // Mettere nel .env
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // To solve a problem of security of the front end requests

exports.sendEmailToProfessor = (receiver, token) => {
  const transport = createTransport();
  const email = template.toProfessor;
  let body = email.body;
  body = `${body}${email.link.substring(0, 20)}"http://${domain}/signin?token=${token}"${email.link.substring(22)}`;
  body = `${body}${email.greetings}`;
  const mailOptions = {
    from: user.email,
    to: receiver,
    subject: email.subject,
    html: body,
  };
  return transport.sendMail(mailOptions); // Return a promise to check if there is an error
};

exports.sendEmailToStudentRequest = (receiver) => {
  const transport = createTransport();
  const email = template.toRequestStudent;
  let body = email.body;
  body = `${body}${email.link.substring(0, 17)}"http://${domain}/"${email.link.substring(19)}`;
  body = `${body}${email.greetings}`;
  const mailOptions = {
    from: user.email,
    to: receiver,
    subject: email.subject,
    html: body,
  };
  return transport.sendMail(mailOptions);
};

exports.sendEmailToTeachingOfficeBook = (receiver, assignment) => {
  const transport = createTransport();
  const email = template.toTeachingOfficeBook;
  let body = `${email.intro}${assignment.student} ${email.body}${assignment.code} ${email.end}`;
  body = `${body}${email.link.substring(0, 17)}"http://${domain}/"${email.link.substring(19)}`;
  body = `${body}${email.greetings}`;
  const mailOptions = {
    from: user.email,
    to: receiver,
    subject: email.subject,
    html: body,
  };
  return transport.sendMail(mailOptions);
};

exports.sendEmailToStudentAssign = (receiver, assignmentCode) => {
  const transport = createTransport();
  const email = template.toStudentAssign;
  let body = `${email.intro}${assignmentCode} ${email.body}`;
  body = `${body}${email.link.substring(0, 17)}"http://${domain}/"${email.link.substring(19)}`;
  body = `${body}${email.greetings}`;
  const mailOptions = {
    from: user.email,
    to: receiver,
    subject: email.subject,
    html: body,
  };
  return transport.sendMail(mailOptions);
};

exports.sendEmailToTeachingOfficeDecline = (receiver, student, assignmentCode) => {
  const transport = createTransport();
  const email = template.toTeachingOfficeDecline;
  let body = `${email.intro}${student} ${email.body}${assignmentCode} </p>`;
  body = `${body}${email.link.substring(0, 17)}"http://${domain}/"${email.link.substring(19)}`;
  body = `${body}${email.greetings}`;
  const mailOptions = {
    from: user.email,
    to: receiver,
    subject: email.subject,
    html: body,
  };
  return transport.sendMail(mailOptions);
};

createTransport = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: user.email,
      pass: user.password,
    },
  });
};
