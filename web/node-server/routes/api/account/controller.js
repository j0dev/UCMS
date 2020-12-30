const User = require("../../../models/user");
const Class = require("../../../models/class");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = (req, res, next) => {
  //   if (!req.decoded.isAdmin) {
  //     return res.status(403).json({
  //       message: "you are not admin",
  //     });
  //   }

  const page = req.body.page;
  console.log(page);

  // const page = User.findOneByUserid(req.params.userid);

  User.find({}).then(users => {
    res.json({
      status: true,
      data: users
    });
  });
};

exports.userNotActive = (req, res, next) => {
  //   if (!req.decoded.isAdmin) {
  //     return res.status(403).json({
  //       message: "you are not admin",
  //     });
  //   }

  // const page = User.findOneByUserid(req.params.userid);

  User.find(
    { isActive: false },
    { userid: true, username: true, _id: true }
  ).then(users => {
    res.json({
      message: users
    });
  });
};

exports.userActive = (req, res) => {
  User.find(
    { isActive: true },
    { userid: true, username: true, _id: true }
  ).then(users => {
    res.json({
      message: users
    });
  });
};

exports.userDelete = (req, res) => {
  const _id = req.body._id;
  let o_id = new ObjectId(_id);
  User.remove({ _id: o_id }).then(data => {
    res.json({
      message: data
    });
  });
};

exports.activeChange = (req, res) => {
  const _id = req.body._id;
  let o_id = new ObjectId(_id);
  User.findOneAndUpdate({ _id: o_id }, { isActive: true }, { new: true }).then(
    data => {
      res.json({
        message: data
      });
    }
  );
};

exports.user = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  const userid = jwt.decode(token, req.app.get("jwt-secret"))["user"]["_id"];
  if (!token) {
    res.status(409).json({
      status: false,
      data: "no-token"
    });
  }

  User.findOne(
    { _id: userid },
    { _id: 0, password: 0, isActive: 0, isAdmin: 0, __v: 0 }
  ).then(user => {
    res.json({
      message: user
    });
  });
};

exports.getStudents = (req, res) => {
  User.find({ type: 2 }, { password: 0, isActive: 0, isAdmin: 0, __v: 0 }).then(
    user => {
      res.json({
        message: user
      });
    }
  );
};

exports.insertClassUser = (req, res) => {
  const _id = req.body._id;
  const userId = req.body.userId;
  let o_id = new ObjectId(_id);
  let o_userId = new ObjectId(userId);

  const respond = result => {
    res.json({
      message: { _id: result._id, name: result.name }
    });
  };

  // run when there is an error (username exists)
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  Class.insertUser(o_id, o_userId).then(respond).catch(onError);
};

exports.userList = (req, res) => {
  // const token = req.headers["x-access-token"] || req.query.token;
  // if (!token) {
  //   return res.status(403).json({
  //     message: "!token"
  //   });
  // }

  const respond = result => {
    res.json({
      message: result
    });
  };

  User.find(
    { isActive: false },
    { _id: true, userid: true, username: true }
  ).then(respond);
  return 0;
};
// exports.assignAdmin = (req, res) => {
//   if (!req.decoded.isAdmin) {
//     return res.status(403).json({
//       message: "you are not admin",
//     });
//   }

//   const user = User.findOneByUserid(req.params.userid);

//   user
//     .then((user) => user.assignAdmin())
//     .then(
//       res.json({
//         success: true,
//       })
//     )
//     .catch(console.log("er"));
// };
