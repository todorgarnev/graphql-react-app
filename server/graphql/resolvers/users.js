const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
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
      const token = jwt.sign({
        id: response.id,
        email: response.email,
        username: response.username
      }, SECRET_KEY, { expiresIn: "1h" });

      return {
        ...response._doc,
        id: response._id,
        token
      }
    }
  }
};