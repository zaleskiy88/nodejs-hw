const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseErrorCreator } = require("../helpers/index");

// ================== Mongoose schema =====================//

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post("save", mongooseErrorCreator);

const User = model("user", userSchema);

// ===============Joi schema ================================//
const addUserSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().min(3).email().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().min(3).email().required(),
});

const joiSchemas = { addUserSchema, loginUserSchema };
// ==================================================//

module.exports = { User, joiSchemas };
