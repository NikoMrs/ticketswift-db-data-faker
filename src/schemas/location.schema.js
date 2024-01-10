const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        type: {
            type: String
        },
        capacity: {
            type: Number
        },
        country: {
            type: String
        },
        // region: {
        //     type: String
        // },
        city: {
            type: String
        },
        postalCode: {
            type: String
        },
        address: {
            type: String
        },
        coordinates: {
            latitude: {
              type: Number
            },
            longitude: {
              type: Number
            }
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("Location", locationSchema);