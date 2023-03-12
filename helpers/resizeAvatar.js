const jimp = require("jimp");
// ============================================ //

const resizeAvatar = async (fileDirPath, width, height) => {
  const avatar = await jimp.read(fileDirPath);
  await avatar.resize(width, height);
  await avatar.writeAsync(fileDirPath);
};

module.exports = resizeAvatar;
