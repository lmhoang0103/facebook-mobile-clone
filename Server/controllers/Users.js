const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');
const FriendModel = require('../models/Friends');
const DocumentModel = require('../models/Documents');
const httpStatus = require('../utils/httpStatus');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../constants/constants');
const uploadFile = require('../functions/uploadFile');
const { generateConfirmationToken } = require('../utils/token');
const usersController = {};

usersController.register = async (req, res, next) => {
  try {
    const {
      phonenumber,
      password,
      username,
      confirmationEmail,
      firstName,
      lastName,
    } = req.body;

    let user = await UserModel.findOne({
      phonenumber: phonenumber,
    });

    if (user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Phone number already exists',
      });
    }

    if (!confirmationEmail) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Invalid confirmation email!',
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let avatar = await DocumentModel.findById('60c39f54f0b2c4268eb53367');
    let coverImage = await DocumentModel.findById('60c39eb8f0b2c4268eb53366');

    // confirmation
    const confirmationToken = generateConfirmationToken();

    user = new UserModel({
      phonenumber: phonenumber,
      password: hashedPassword,
      username: username,
      avatar: '60c39f54f0b2c4268eb53367',
      cover_image: '60c39eb8f0b2c4268eb53366',
      confirmationEmail,
      confirmationToken,
      isActivated: true,
      firstName,
      lastName,
    });

    try {
      const savedUser = await user.save();
      res.status(httpStatus.CREATED).json({
        data: {
          id: savedUser._id,
          phonenumber: savedUser.phonenumber,
          username: savedUser.username,
          avatar: avatar,
          cover_image: coverImage,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
        },
      });
    } catch (e) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: e.message,
      });
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};

usersController.activateAccount = async (req, res, next) => {
  const { phonenumber, token } = req.body;

  try {
    const user = await UserModel.findOne({
      phonenumber,
    });

    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'User not found!',
      });
    }

    if (user.confirmationToken !== token) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Invalid token',
      });
    }

    await UserModel.findByIdAndUpdate(user._id, {
      isActivated: true,
    });

    const accessToken = jwt.sign(
      {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      },
      JWT_SECRET
    );

    res.status(httpStatus.OK).json({
      data: {
        id: user._id,
        phonenumber: user.phonenumber,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};

usersController.login = async (req, res, next) => {
  try {
    console.log(123123);
    const { phonenumber, password } = req.body;
    const user = await UserModel.findOne({
      phonenumber: phonenumber,
    });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Username or password incorrect',
      });
    }

    if (!user.isActivated) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: `User is not activated. Please check your email at: ${user.confirmationEmail}`,
        isNotVerified: true,
      });
    }

    // password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Username or password incorrect',
      });
    }

    // login success

    // create and assign a token
    const token = jwt.sign(
      {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      },
      JWT_SECRET
    );
    delete user['password'];
    return res.status(httpStatus.OK).json({
      data: {
        id: user._id,
        phonenumber: user.phonenumber,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: token,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
usersController.edit = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user;
    const { avatar, cover_image } = req.body;
    const dataUserUpdate = {};
    const listPros = [
      'username',
      'gender',
      'birthday',
      'description',
      'address',
      'city',
      'country',
      'avatar',
      'cover_image',
      'firstName',
      'lastName',
    ];
    for (let i = 0; i < listPros.length; i++) {
      let pro = listPros[i];
      if (req.body.hasOwnProperty(pro)) {
        switch (pro) {
          case 'avatar':
            let savedAvatarDocument = null;
            if (uploadFile.matchesFileBase64(avatar) !== false) {
              const avatarResult = uploadFile.uploadFile(avatar);
              if (avatarResult !== false) {
                let avatarDocument = new DocumentModel({
                  fileName: avatarResult.fileName,
                  fileSize: avatarResult.fileSize,
                  type: avatarResult.type,
                });
                savedAvatarDocument = await avatarDocument.save();
              }
            } else {
              savedAvatarDocument = await DocumentModel.findById(avatar);
            }
            dataUserUpdate[pro] =
              savedAvatarDocument !== null ? savedAvatarDocument._id : null;
            break;
          case 'cover_image':
            let savedCoverImageDocument = null;
            if (uploadFile.matchesFileBase64(cover_image) !== false) {
              const coverImageResult = uploadFile.uploadFile(cover_image);
              if (coverImageResult !== false) {
                let coverImageDocument = new DocumentModel({
                  fileName: coverImageResult.fileName,
                  fileSize: coverImageResult.fileSize,
                  type: coverImageResult.type,
                });
                savedCoverImageDocument = await coverImageDocument.save();
              }
            } else {
              savedCoverImageDocument = await DocumentModel.findById(
                cover_image
              );
            }
            dataUserUpdate[pro] =
              savedCoverImageDocument !== null
                ? savedCoverImageDocument._id
                : null;
            break;
          default:
            dataUserUpdate[pro] = req.body[pro];
            break;
        }
      }
    }

    user = await UserModel.findOneAndUpdate({ _id: userId }, dataUserUpdate, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Can not find user' });
    }
    user = await UserModel.findById(userId)
      .select(
        'phonenumber username gender birthday avatar cover_image blocked_inbox blocked firstName lastName'
      )
      .populate('avatar')
      .populate('cover_image');
    return res.status(httpStatus.OK).json({
      data: user,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
usersController.changePassword = async (req, res, next) => {
  try {
    let userId = req.userId;
    let user = await UserModel.findById(userId);
    if (user == null) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'UNAUTHORIZED',
      });
    }
    const { currentPassword, newPassword } = req.body;
    // password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Current password incorrect',
        code: 'CURRENT_PASSWORD_INCORRECT',
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        password: hashedNewPassword,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Can not find user' });
    }

    // create and assign a token
    const token = jwt.sign(
      {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      },
      JWT_SECRET
    );
    user = await UserModel.findById(userId)
      .select(
        'phonenumber username gender birthday avatar cover_image blocked_inbox blocked firstName lastName'
      )
      .populate('avatar')
      .populate('cover_image');
    return res.status(httpStatus.OK).json({
      data: user,
      token: token,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
usersController.show = async (req, res, next) => {
  try {
    let userId = null;
    if (req.params.id) {
      userId = req.params.id;
    } else {
      userId = req.userId;
    }

    let user = await UserModel.findById(userId)
      .select(
        'phonenumber username gender birthday avatar cover_image blocked_inbox blocked description firstName lastName'
      )
      .populate('avatar')
      .populate('cover_image');
    if (user == null) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Can not find user' });
    }

    return res.status(httpStatus.OK).json({
      data: user,
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

usersController.showByPhone = async (req, res, next) => {
  try {
    let phonenumber = req.params.phonenumber;

    let user = await UserModel.findOne({ phonenumber: phonenumber })
      .populate('avatar')
      .populate('cover_image');
    if (user == null) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Can not find user' });
    }

    return res.status(httpStatus.OK).json({
      data: user,
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

usersController.setBlock = async (req, res, next) => {
  try {
    let targetId = req.body.user_id;
    if (targetId == req.userId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Không thể tự chặn bản thân',
      });
    }
    let type = req.body.type;
    let user = await UserModel.findById(req.userId);
    const blocked = user.blocked || [];

    if (type === 'block') {
      if (blocked.indexOf(targetId) === -1) {
        blocked.push(targetId);
      }

      // remove friend
      let friendRc1 = await FriendModel.findOne({
        sender: targetId,
        receiver: req.userId,
        status: '1',
      });
      let friendRc2 = await FriendModel.findOne({
        sender: req.userId,
        receiver: targetId,
        status: '1',
      });

      let final;
      if (friendRc1 == null) {
        final = friendRc2;
      } else {
        final = friendRc1;
      }
      if (final && final.status == '1') {
        final.status = '3';
        final.save();
      }
    } else if (type === 'unblock') {
      const index = blocked.indexOf(targetId);
      if (index > -1) {
        blocked.splice(index, 1);
      }
    }

    user.blocked = blocked;
    await user.save();

    res.status(200).json({
      code: 200,
      message: 'Thao tác thành công',
      data: user,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
usersController.setBlockInbox = async (req, res, next) => {
  try {
    let targetId = req.body.user_id;
    if (targetId == req.userId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Không thể tự chặn bản thân',
      });
    }
    let type = req.body.type;
    let user = await UserModel.findById(req.userId);
    const blocked = user.blocked_inbox || [];

    if (type === 'block') {
      if (blocked.indexOf(targetId) === -1) {
        blocked.push(targetId);
      }
    } else if (type === 'unblock') {
      const index = blocked.indexOf(targetId);
      if (index > -1) {
        blocked.splice(index, 1);
      }
    }

    user.blocked_inbox = blocked;
    user.save();

    res.status(200).json({
      code: 200,
      message: 'Thao tác thành công',
      data: user,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};
usersController.searchUser = async (req, res, next) => {
  try {
    let searchKey = new RegExp(req.body.keyword, 'i');
    let result = await UserModel.find({ phonenumber: searchKey })
      .limit(10)
      .populate('avatar')
      .populate('cover_image')
      .exec();

    res.status(200).json({
      code: 200,
      message: 'Tìm kiếm thành công',
      data: result,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message,
    });
  }
};

module.exports = usersController;
