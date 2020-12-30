const Classroom = require("../../../models/classroom");
const Building = require("../../../models/building");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = (req, res, next) => {
  const buildingId = req.params.id;
  console.log(buildingId);
  let o_id = new ObjectId(buildingId);

  const onError = (error) => {
    res.status(403).json({
      data: error.message,
    });
  };

  Building.findOne({ _id: o_id })
    .populate({
      path: "classRoomId",
      select: "_id name row col comCount computerId",
      populate: { path: "computerId", model: "Computer", select: "pcNumber" },
    })
    .then((classroom) => {
      res.json({
        message: classroom,
      });
    })
    .catch(onError);
};

exports.create = (req, res) => {
  const name = req.body.name;
  const buildingId = req.body.buildingId;
  const row = req.body.row;
  const col = req.body.col;
  const comCount = req.body.comCount;

  if (
    name.length < 1 ||
    buildingId.length < 1 ||
    row.length < 1 ||
    col.length < 1 ||
    comCount.lencth < 1
  ) {
    res.status(403).json({
      message: "값을 입력해주시기 바랍니다.",
    });
  }

  const create = (building) => {
    if (!building) {
      throw new Error("존재하지 않은 건물입니다.");
    } else {
      return Classroom.create(name, row, col, comCount);
    }
  };

  const insertBuidling = (result) => {
    return Building.insertClassroom(buildingId, result._id);

    // return result;
  };

  const respond = (result) => {
    res.json({
      message: result,
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };
  // secuCheck(name).catch(onError);
  Building.findOneByBuildingId(buildingId)
    .then(create)
    .then(insertBuidling)
    .then(respond)
    .catch(onError);
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
    return Building.findOneAndUpdate(
      { classRoomId: o_id },
      { $pull: { classRoomId: { $in: [_id] } } }
    );
  };

  const classroomRemove = () => {
    return Classroom.remove({ _id: o_id });
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
  remove(o_id).then(classroomRemove).then(respond).catch(onError);
};
