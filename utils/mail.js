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

/**
 * Sends the mail to professor to confirm the registration
 * @param {string} receiver The email of the receiver
 * @param {string} token The token jwt
 * @return {Promise} Promise object which sends the mail
 */
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

/**
 * Sends the mail to a student to inform about the request of an assignment
 * @param {string} receiver The email of the receiver
 * @return {Promise} Promise object which sends the mail
 */
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

/**
 * Sends the mail to teachingOffice to inform about the booking of the assignment
 * @param {string} receiver The email of the receiver
 * @param {Assignment} assignment The assignment which is been booked
 * @return {Promise} Promise object which sends the mail
 */
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

/**
 * Sends the mail to an student to inform about the assigned assignment
 * @param {string} receiver The email of the receiver
 * @param {string} assignmentCode The code of the assigned assignment
 * @return {Promise} Promise object which sends the mail
 */
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

/**
 * Sends a mail to Teaching office to inform about the decline of an assignment
 * @param {string} receiver The email of the receiver
 * @param {string} student The email fo the student, who declined the assignment
 * @param {string} assignmentCode The code of the declined assignment
 * @return {Promise} Promise object which sends the mail
 */
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

/**
 * Creates a new transport
 * @return {Transport} transport to send Mail
 */
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
