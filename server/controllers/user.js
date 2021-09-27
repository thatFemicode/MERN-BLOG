const bcrypt = require('bcryptjs');
// The above is sused for password hashing
const jwt = require('jsonwebtoken');
// The above is a safeway to store the users in the browser for a week or a month
const User = require('../models/user');

const signin = async (req, res) => {
  // For signin going to get password and email from req.body
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Credentials' });

    //   then we can get JSWT we can send to trhe frontend
    // The below takes in three parameters, the second one is the secret that only i know
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(5000).json({ message: 'Something went Wrong' });
  }
};
const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords does not match' });

    // before creating a user we have to hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    // /After creting the user we have to create the token
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });

    res.status(200).json({ result, token });
  } catch {
    res.status(5000).json({ message: 'Something went Wrong' });
  }
};
module.exports = { signin, signup };
