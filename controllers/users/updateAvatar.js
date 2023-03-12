const fs = require("fs/promises");
const path = require("path");
const { errorCreator, resizeAvatar } = require("../../helpers/index");
const { userSchemas } = require("../../models/index");

// =========================================================== //
const { User } = userSchemas;

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUploadDir, filename } = req.file;

    const { _id } = req.user;
    const [fileExtension] = filename.split(".").reverse(); // extracting file extension
    const avatarName = `${_id}.${fileExtension}`; // Creating new avatar name with _id
    const avatarsDirPath = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      avatarName
    );

    await resizeAvatar(tempUploadDir, 250, 250); // resizing avatar

    await fs.rename(tempUploadDir, avatarsDirPath); // Moving avatar from temp dir o public/avatars

    const avatarURL = path.join("avatars", avatarName);

    // Updating in db
    await User.findByIdAndUpdate(_id, {
      avatarURL,
    });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw errorCreator(401, "Not authorized");
  }
};

module.exports = updateAvatar;
