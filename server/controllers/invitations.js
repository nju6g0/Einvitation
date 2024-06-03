const { v4: uuidv4 } = require("uuid");
const tinify = require("tinify");
tinify.key = process.env.TINYPNG_API_KEY;

const validation = require("../validation");
const firebaseAdmin = require("../config/firebase");
const bucket = firebaseAdmin.storage().bucket();
const Invitations = require("../models").invitation;
const Reception = require("../models").reception;

const getInvitations = async (req, res) => {
  const { _id } = req.params;
  try {
    const receptionInfo = await Reception.findOne({ _id });
    const invitationList = await Invitations.find({
      receptionID: _id,
    }).exec();
    return res.send({
      receptionInfo,
      invitationList,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const getSingleInvitation = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Invitations.findOne({
      _id,
    }).exec();
    return res.send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const uploadInvitationImage = async (req, res) => {
  // save image on firebase
  // https://israynotarray.com/nodejs/20221225/1867465275/#google_vignette
  // 取得上傳的檔案資訊
  const file = req.file;
  // 上傳圖片到 TinyPNG 並壓縮
  await tinify.fromBuffer(file.buffer).toBuffer(function (err, resultData) {
    if (err) throw err;

    // 基於檔案的原始名稱建立一個 blob 物件, 並將檔案重新命名
    const blob = bucket.file(
      `images/${uuidv4()}.${file.originalname.split(".").pop()}`
    );
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();

    blobStream.on("finish", () => {
      // 設定檔案的存取權限
      const config = {
        action: "read", // 權限
        expires: "12-31-2500", // 網址的有效期限
      };
      // 取得檔案的網址
      blob.getSignedUrl(config, (err, imgUrl) => {
        res.send({ imgUrl });
      });
    });

    blobStream.on("error", (err) => {
      res.status(500).send("上傳失敗");
    });

    // 將壓縮後的圖片上傳到 Firebase Storage
    blobStream.end(resultData);
  });
};

const createInvitation = async (req, res) => {
  // TODO: 確認資料是否符合規範

  const { _id } = req.params;
  const receptionInfo = await Reception.findOne({
    _id,
  }).exec();

  // 確認 user 創建的 invitations，是否已達上限
  const isReachMax = await Invitations.hasReachMax(
    _id,
    receptionInfo.availableQuantity
  );
  if (isReachMax) {
    return res.status(400).send({
      error: true,
      message: "已達可建立上限",
    });
  }

  // 儲存 invitation
  const { reciever, content, imageUrl, template } = req.body;
  const newInvitationtion = new Invitations({
    receptionID: _id,
    hostID: req.user._id,
    reciever,
    content,
    imageUrl,
    template,
  });

  try {
    const savedInvitation = await newInvitationtion.save();
    return res.send({
      message: "新增成功",
      data: savedInvitation,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateInvitation = async (req, res) => {
  // TODO: 確認資料是否符合規範

  const { _id } = req.params;
  //儲存 invitation
  const { reciever, content, imageUrl, isAttend, attendantCount, template } =
    req.body;
  try {
    const updatedInvitation = await Invitations.findOneAndUpdate(
      { _id },
      { reciever, content, imageUrl, isAttend, attendantCount, template },
      { runValidators: true, new: true }
    ).exec();
    return res.send({
      message: "更新成功",
      data: updatedInvitation,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getInvitations,
  uploadInvitationImage,
  createInvitation,
  updateInvitation,
  getSingleInvitation,
};
