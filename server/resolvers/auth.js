const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const authMutations = {
  createUser: async (parent, args) => {
    try {
      console.log(args)
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        throw new Error('Użytkownik o podanym emailu już istnieje.');
      }
      if (!EMAIL_REGEX.test(args.email)) {
        throw new Error('Struktura emaila jest nieprawidłowa.');
      }
      if (args.password.length < 8) {
        throw new Error('Hasło musi zawierać przynajmniej 8 znaków');
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const user = new User({
        email: args.email,
        password: hashedPassword,
        name: args.name,
        birthDate: args.birthDate,
        imgNumber: args.imgNumber,
        gender: args.gender,
        starredPostIds: []
      });

      await user.save();
      return true;
    } catch (err) {
      throw err;
    }
  },
  login: async (parent, { email, password }) => {
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
  },
  userData: async (parent, args, req) => {
    if (!req.isAuth || !req.userId) {
      throw new Error('Authentication failed.')
    }
    return User.findById(req.userId);
  }
};

module.exports = authMutations;
