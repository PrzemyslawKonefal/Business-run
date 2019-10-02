const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  createUser: async (parent, args) => {
    try {
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      if (!EMAIL_REGEX.test(args.email)) {
        throw new Error('email is invalid.');
      }
      if (args.password.length < 8) {
        throw new Error('Password must contain at least 8 characters');
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const user = new User({
        email: args.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async (parent, { email, password }, xx) => {
    console.log(xx.isAuth, xx.userId);
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    };
  }
};
