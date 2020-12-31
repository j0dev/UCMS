const jwt = require("jsonwebtoken");
const Classroom = require("../../../models/classroom");
const Building = require("../../../models/building");
const Class = require("../../../models/class");
const User = require("../../../models/user");
var ObjectId = require("mongoose").Types.ObjectId;

exports.computer = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  const userid = jwt.decode(token, req.app.get("jwt-secret"))["user"]["_id"];

  let o_id = new ObjectId(userid);

  if (userid === undefined || userid === null) {
    res.status(403).json({
      message: "qwerqwer",
    });
  }
  const findClassList = () => {
    return Class.find()
      .or([{ userId: o_id }, { childId: o_id }], { __v: 0 })
      .populate("userId", "username _id")
      .populate("buildingId", "name _id")
      .populate("classRoomId", "name _id");
  };

  const respond = (result) => {
    res.json({
      message: result,
    });
  };

  const onError = (error) => {
    res.status(403).json({
      data: error.message,
    });
  };

  findClassList().then(respond).catch(onError);
};

exports.list = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  const userid = jwt.decode(token, req.app.get("jwt-secret"))["user"]["_id"];

  let o_id = new ObjectId(userid);

  if (userid === undefined || userid === null) {
    res.status(403).json({
      message: "qwerqwer",
    });
  }

  const findClassList = () => {
    return Class.find({ userId: o_id }, { __v: 0 })
      .populate("userId", "username _id")
      .populate("buildingId", "name _id")
      .populate("classRoomId", "name _id");
  };

  // Building.findOne({ _id: o_id })
  //     .populate("classRoomId")
  //     .then((classroom) => {
  //         res.json({
  //             message: classroom,
  //         });
  //     })
  //     .catch(onError);

  const respond = (result) => {
    res.json({
      message: result,
    });
  };

  const onError = (error) => {
    res.status(403).json({
      data: error.message,
    });
  };

  findClassList().then(respond).catch(onError);

  //   Class.findClassByName({ _id: o_id })
  //     .populate("classRoomId")
  //     .then((classroom) => {
  //       res.json({
  //         message: classroom,
  //       });
  //     })
  //     .catch(onError);
};

exports.create = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  const userid = jwt.decode(token, req.app.get("jwt-secret"))["user"]["_id"];
  console.log(userid);
  let o_id = new ObjectId(userid);

  const name = req.body.name;
  const buildingId = req.body.buildingId;
  const classRoomId = req.body.classRoomId;

  if (name.length < 1 || buildingId.length < 1 || classRoomId.length < 1) {
    res.status(403).json({
      message: "값을 입력해주시기 바랍니다.",
    });
  }

  const create = (classN) => {
    if (classN) {
      throw new Error("이미 존재하는 수업입니다.");
    } else {
      return Class.create(name, o_id, buildingId, classRoomId);
    }
  };

  const respond = (result) => {
    res.json({
      message: result
        .populate("userId", "username _id")
        .populate("buildingId", "name _id")
        .populate("classRoomId", "name _id"),
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };
  // secuCheck(name).catch(onError);
  Class.findClassByName(name).then(create).then(respond).catch(onError);
};

exports.update = (req, res) => {
  const _id = req.body._id;
  let o_id = new ObjectId(_id);
  const name = req.body.classroomName;
  const row = req.body.row;
  const col = req.body.col;
  const comCount = req.body.comCount;

  const update = (classroom) => {
    if (!classroom) {
      console.log("bui;ldig", classroom);
      throw new Error("해당 강의실은 존재하지 않습니다.");
    } else {
      console.log("bui;ldig", o_id);
      return Classroom.update(o_id, name, row, col, comCount);
    }
  };
  const respond = () => {
    res.json({
      message: { _id, name, row, col, comCount },
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  Classroom.findNameById(o_id).then(update).then(respond).catch(onError);
};

exports.delete = (req, res) => {
  const _id = req.params.id;
  let o_id = new ObjectId(_id);

  console.log(_id);

  const remove = (o_id) => {
    return Class.findOne({ _id: o_id });
  };

  const classRemove = () => {
    return Class.remove({ _id: o_id });
  };

  const respond = () => {
    res.json({
      message: _id,
    });
  };

  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };
  remove(o_id).then(classRemove).then(respond).catch(onError);
};
