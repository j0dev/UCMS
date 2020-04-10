const User = require("../../../models/user");

exports.list = (req, res, next) => {
  //   if (!req.decoded.isAdmin) {
  //     return res.status(403).json({
  //       message: "you are not admin",
  //     });
  //   }

  const page = req.body.page;
  console.log(page);

  // const page = User.findOneByUserid(req.params.userid);

  User.find({}).then((users) => {
    res.json({
      status: true,
      data: users,
    });
  });
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
