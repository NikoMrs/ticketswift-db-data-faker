const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const eventSchema = new mongoose.Schema(
    {
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist._id'
        },
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location._id'
        },
        tickets: [
            {
                name: {
                    type: String
                },
                availability: {
                    type: Number
                },
                price: {
                    type: Number
                },
                _id: {
                    type: mongoose.Schema.Types.ObjectId
                }
            }
        ],
        saleStart: {
            type: Date
        },
        saleEnd: {
            type: Date
        },
        date: {
            type: Date
        },
        genre: {
            type: String
        },
        subgenre: {
            type: [String]
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

module.exports = mongoose.model("Event", eventSchema);