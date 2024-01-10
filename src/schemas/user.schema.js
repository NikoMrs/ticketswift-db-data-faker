const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        pwd: {
            type: String
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("User", userSchema);