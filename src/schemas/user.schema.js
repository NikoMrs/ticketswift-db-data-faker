const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema(
    {
        createdAt: {
          type: Date,
          default: Date.now
        },
        modifiedAt: {
          type: Date,
          default: Date.now
        },
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