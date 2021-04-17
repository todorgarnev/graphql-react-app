const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  months: [
    {
      year: Number,
      month: Number,
      paid: Boolean
    }
  ]
});

module.exports = model("User", userSchema);
