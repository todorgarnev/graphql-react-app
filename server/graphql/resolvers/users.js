const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput, validateLoginInput } = require("../../util/validators");
const { generateToken } = require("../../util/common");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken"
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });
      const response = await newUser.save();
      const token = generateToken(response);

      return {
        ...response._doc,
        id: response._id,
        token
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
};
