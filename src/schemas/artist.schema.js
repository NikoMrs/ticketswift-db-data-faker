const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const artistSchema = new mongoose.Schema(
    {
        createdAt: {
          type: Date,
          default: Date.now
        },
        modifiedAt: {
          type: Date,
          default: Date.now
        },
        name: {
            type: String
        },
        awards: [{
            name: {
                type: String
            },
            year: {
                type: Number
            },
            category: {
                type: String
            }
        }],
        socialMedia: {
            twitter: {
              type: String,
            },
            facebook: {
              type: String,
            },
            instagram: {
              type: String,
            }
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("Artist", artistSchema);