const Classroom = require("../../../models/classroom");
const Computer = require("../../../models/computer");
const Program = require("../../../models/program");
var ObjectId = require("mongoose").Types.ObjectId;

exports.enroll = (req, res) => {
  const { mac, ip, pcNumber, classRoomId } = req.body;
  const o_id = new ObjectId(classRoomId);
  console.log(mac);

  console.log(mac, ip, pcNumber, classRoomId);

  const create = classroom => {
    if (!classroom) {
      throw new Error("존재하지 않은 강의실입니다.");
    } else {
      return Computer.create(mac, ip, pcNumber, o_id);
    }
  };
  const insertClaassrom = result => {
    if (!result) {
      throw new Error("fail");
    } else {
      return Classroom.insertComputer(o_id, result._id);
    }
  };
  const respond = () => {
    res.json({
      message: "success"
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };
  Classroom.findNameById(o_id)
    .then(create)
    .then(insertClaassrom)
    .then(respond)
    .catch(onError);
};

exports.list = (req, res) => {
  const _id = req.params.id;
  let o_id = new ObjectId(_id);

  const respond = result => {
    res.json({
      message: result
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  Classroom.findNameByIdComputerList(o_id).then(respond).catch(onError);
};

exports.delete = (req, res) => {
  const mac = req.body.mac;

  const onError = error => {
    res.status(403).json({
      data: error.message
    });
  };

  const respond = result => {
    res.json({
      message: result
    });
  };

  Computer.delete(mac).then(respond).catch(onError);
};

// exports.powerChange = (req, res) => {
//   const { mac, isPower } = req.body;

//   const update = (computer) => {
//     if (!computer) {
//       throw new Error("존재하지 않은 컴퓨터 입니다.");
//     } else {

//     }
//   };

//   Computer.findByMac(mac);
// };

// exports.program = (req, res) => {
//   const _id = req.params.id;
//   let o_id = new ObjectId(_id);

//   const respond = result => {
//     res.json({
//       message: result
//     });
//   };
//   const onError = error => {
//     res.status(403).json({
//       message: error.message
//     });
//   };

//   Classroom.findNameByIdComputerList(o_id).then(respond).catch(onError);

//   return 0;
// };

exports.install = (req, res) => {
  const respond = result => {
    res.json({
      message: result
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  Program.list().then(respond).catch(onError);
};

exports.installInsert = (req, res) => {
  const name = req.body.name;
  const respond = result => {
    res.json({
      message: result
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  Program.create(name).then(respond).catch(onError);
};

exports.installUpdate = (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  const respond = result => {
    res.json({
      message: result
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };
  Program.update(_id, name).then(respond).catch(onError);
};

exports.installDelete = (req, res) => {
  const _id = req.body._id;

  const respond = () => {
    res.json({
      message: _id
    });
  };
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };
  Program.delete(_id).then(respond).catch(onError);
};
