const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    movieId: {
        type: Number,
        required: true,
    },
    userId: {
       type: Schema.Types.ObjectId,
         ref: "user",
    required: true,

    },
});

const favoriteModel = mongoose.model("favorite", favoriteSchema);
module.exports = favoriteModel;