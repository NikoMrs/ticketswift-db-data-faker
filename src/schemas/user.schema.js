const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema(
    {
        createdOn: {
          type: Date,
          default: Date.now
        },
        modifiedOn: {
          type: Date,
          default: Date.now
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("User", userSchema);