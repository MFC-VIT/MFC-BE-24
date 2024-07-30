const transporter = require('../utils/nodemailer');

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  console.log(email)
  const mailOptions = {
    from: `${email}`,
    to: 'ishaanagarwal1203@gmail.com',
    subject: `Contact Us Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    res.status(500).json({ error: 'Error sending message. Please try again later.' });
  }
};
