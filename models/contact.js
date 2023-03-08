const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
const { errorCreator } = require("../helpers/index");

// ================== Mongoose schema =====================//
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

contactSchema.post("save", (err, data, next) => {
  errorCreator(400, err.message);
  next(err);
});

const Contact = model("contact", contactSchema);

// ================== Joi schema =====================//
const addContactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(3).email().required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean(),
});

const toggleFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiSchemas = { addContactSchema, toggleFavoriteSchema };
// ==================================================//
module.exports = { Contact, joiSchemas };
