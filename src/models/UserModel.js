const mongooes = require("mongoose")
const userSchema = new mongooes.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: Number, require: true },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        timestamps: true
    }
);
const User = mongooes.model("User", userSchema);
module.exports = User;
