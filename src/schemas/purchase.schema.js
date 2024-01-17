const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const purchaseSchema = new mongoose.Schema(
    {
        createdAt: {
          type: Date,
          default: Date.now
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        },
        cart: {
            type: [{
                ticketId: {
                    type: mongoose.Schema.Types.ObjectId
                },
                quantity: {
                    type: Number
                },
                price: {
                    type: Number
                }
            }],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User._id'
        },
        date: {
            type: Date
        },
        state: {
            type: String,
            enum: ['pending', 'completed', 'failed']
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("Purchase", purchaseSchema);