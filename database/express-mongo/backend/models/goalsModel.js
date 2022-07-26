const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // reference another doc
      required: true, 
      ref: "User", // This is the name of the model
    }, 
    text: {
      type: String,
      required: [true, "Please add a goal"],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Goal", goalSchema); 