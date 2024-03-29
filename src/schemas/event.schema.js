const mongoose = require("mongoose");
const artistSchema = require("./artist.schema").schema
const locationSchema = require("./location.schema").schema

mongoose.set("strictQuery", true);

const eventSchema = new mongoose.Schema(
    {
        createdAt: {
          type: Date,
          default: Date.now
        },
        modifiedAt: {
          type: Date,
          default: Date.now
        },
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        artist: {
            type: artistSchema
        },
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location._id'
        },
        location: {
            type: locationSchema
        },
        name: {
            type: String
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