const Building = require("../../../models/building");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = (req, res, next) => {
  //   if (!req.decoded.isAdmin) {
  //     return res.status(403).json({
  //       message: "you are not admin",
  //     });
  //   }

  // const page = User.findOneByUserid(req.params.userid);
  const onError = (error) => {
    res.status(403).json({
      data: error.message,
    });
  };

  Building.find({}, { classRoomId: 0, __v: 0 })
    .then((buildings) => {
      res.json({
        message: buildings,
      });
    })
    .catch(onError);
};

exports.create = (req, res) => {
  const name = req.body.name;
  if (name.length < 1) {
    console.log(1);
    res.status(403).json({
      message: "값을 입력해주시기 바랍니다.",
    });
  }

  const create = (building) => {
    if (building) {
      throw new Error("이미 존재하는 건물명입니다.");
    } else {
      return Building.create(name);
    }
  };

  const respond = (result) => {
    res.json({
      message: { _id: result._id, name: result.name },
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };
  // secuCheck(name).catch(onError);
  Building.findOneByBuilding(name).then(create).then(respond).catch(onError);
};

exports.update = (req, res) => {
  const _id = req.body._id;
  let o_id = new ObjectId(_id);
  const name = req.body.name;

  const check = (building) => {
    if (building) {
      throw new Error("이미 존재하는 건물명입니다.");
    } else {
      return o_id;
    }
  };
  const update = (building) => {
    if (!building) {
      console.log("bui;ldig", building);
      throw new Error("해당 건물은 존재하지 않습니다.");
    } else {
      console.log("bui;ldig", o_id);
      return Building.update(o_id, name);
    }
  };
  const respond = () => {
    res.json({
      message: { _id, name },
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  Building.findOneByBuilding(name)
    .then(check)
    .then(Building.findOneByBuildingId(o_id))
    .then(update)
    .then(respond)
    .catch(onError);
};

exports.delete = (req, res) => {
  const _id = req.params.id;
  let o_id = new ObjectId(_id);
  const remove = (building) => {
    if (!building) {
      throw new Error("해당 건물은 존재하지 않습니다.");
    } else {
      return Building.delete(o_id);
    }
  };
  const respond = () => {
    res.json({
      message: _id,
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  Building.findOneByBuildingId(o_id).then(remove).then(respond).catch(onError);
};
