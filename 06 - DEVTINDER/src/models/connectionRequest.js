const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not allowed in status",
      }
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequestSchema.pre("save", function(next){
//     if (this.toUserId.equals(this.fromUserId)){
//         throw new Error("Can't send connection request to Yourself");
//     }
//     next();
// })

connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  //chekc is fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You Cannot send connection request to yourself");
  }
});
const ConnectionRequest = new mongoose.model("ConnectionRequests",connectionRequestSchema);

module.exports = ConnectionRequest;