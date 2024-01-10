const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const purchaseSchema = new mongoose.Schema(
    {
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
        }
    },
    {
      versionKey: false,
    }
);

module.exports = mongoose.model("Purchase", purchaseSchema);