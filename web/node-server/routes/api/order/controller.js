const Classroom = require("../../../models/classroom");
const Computer = require("../../../models/computer");
const Order = require("../../../models/order");
var ObjectId = require("mongoose").Types.ObjectId;

// user req handle

exports.list = (req, res) => {
  const classRoomId = req.params.id;
  let o_id = new ObjectId(classRoomId);

  const onError = error => {
    res.status(403).json({
      data: error.message
    });
  };

  Classroom.findOne({ _id: o_id })
    .populate({
      path: "computerId",
      populate: { path: "computerId", model: "Computer", select: "pcNumber" }
    })
    .then(classroom => {
      res.json({
        message: classroom
      });
    })
    .catch(onError);

  // 초기 class 선택했을 때 해당 class 가 속한 classroom의 컴퓨터 리트스 출력
};

exports.detail = (req, res) => {
  const mac = req.body.mac;

  const onError = error => {
    res.status(403).json({
      data: error.message
    });
  };
  Order.findByMac(mac)
    .then(computer => {
      res.json({
        message: computer
      });
    })
    .catch(onError);

  // 특정 computer의 정보 출력
};

exports.create = (req, res) => {
  // 명령 생성

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

  const onCommand = req => {
    const command = req.body.command;
    const mac = req.body.mac;

    if (command === "shutdown") {
      const order = new Order({
        command: "shutdown",
        mac: mac
      });
      return order.save();
    } else if (command === "lockSecond") {
      const second = req.body.second;
      const order = new Order({
        command: "lockSecond",
        mac: mac,

        second: second
      });
      return order.save();
    } else if (command === "lock") {
      const start = req.body.start;
      const end = req.body.end;
      const order = new Order({
        command: "lock",
        mac: mac,

        start: start,
        end: end
      });
      return order.save();
    } else if (command === "startApplication") {
      const order = new Order({
        command: "startApplication",
        mac: mac
      });
      return order.save();
    } else if (command === "installedApplication") {
      const order = new Order({
        command: "installedApplication",
        mac: mac
      });
      return order.save();
    } else if (command === "unLock") {
      const order = new Order({
        command: "unLock",
        mac: mac
      });
      return order.save();
    } else {
      throw new Error("존재하지 않는 명령입니다.");
    }
  };
  onCommand(req).then(respond).catch(onError);
};

exports.createall = (req, res) => {
  const classRoomId = req.body._id;
  let o_id = new ObjectId(classRoomId);
  // 명령 생성

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

  const onCommand = result => {
    let order = "";
    const command = req.body.command;

    if (command === "shutdown") {
      result.computerId.map(item =>
        Order.createStartApp({ command: "shutdown", mac: item.mac })
      );
    } else if (command === "lockSecond") {
      const second = req.body.second;

      result.computerId.map(item =>
        Order.createLockSec({
          command: "lockSecond",
          mac: item.mac,
          second: second
        })
      );

      // result.computerId.map(
      //   item =>
      //     (order = new Order({
      //       command: "lockSecond",
      //       mac: item.mac,
      //       second: second
      //     }).save())
      // );
    } else if (command === "lock") {
      const start = req.body.start;
      const end = req.body.end;

      result.computerId.map(item =>
        Order.createLock({
          command: "lock",
          mac: item.mac,
          start: start,
          end: end
        })
      );
    } else if (command === "startApplication") {
      console.log(result);
      result.computerId.map(item =>
        Order.createStartApp({ command: "startApplication", mac: item.mac })
      );
    } else if (command === "installedApplication") {
      result.computerId.map(item =>
        Order.createStartApp({ command: "installedApplication", mac: item.mac })
      );
    } else if (command === "unLock") {
      result.computerId.map(item =>
        Order.createStartApp({ command: "unLock", mac: item.mac })
      );
    } else {
      throw new Error("존재하지 않는 명령입니다.");
    }
  };
  Classroom.findOne({ _id: o_id })
    .populate({
      path: "computerId",
      model: "Computer",
      select: "mac"
    })
    .then(onCommand)
    .then(respond)
    .catch(onError);
  // .then(onCommand).then(respond).catch(onError);
  // onCommand(req).then(respond).catch(onError);
};

// computer req handlee

exports.checkOrder = (req, res) => {
  const mac = req.body.mac;

  const isCheckDone = () => {
    console.log(mac);
    return Order.updateMany({ mac }, { $set: { isProgress: true } });
  };

  const orderfindByMac = result => {
    // Computer.findByMac(mac);

    if (result) {
      return Order.findByMacCheck(result.mac);
    } else {
      throw new Error("reEnroll");
    }
  };

  const onError = error => {
    res.status(200).json({
      message: error.message
    });
  };
  const respond = result => {
    res.json({
      message: result
    });
  };

  Computer.findByMac(mac)
    .then(orderfindByMac)
    .then(respond)
    .then(isCheckDone)
    .catch(onError);
};

exports.programList = (req, res) => {
  const programList = req.body.programList;
  programList.map(item => (item.name = decodeURI(item.name)));

  const type = Number(req.body.type);
  const mac = req.body.mac;
  const updateProgramList = () => {
    return Computer.findOneAndUpdate({ mac }, { programList }, { new: true });
  };
  const pushProgramlist = () => {
    return Computer.update(
      { mac },
      { $push: { programList: { $each: programList } } }
    );
  };
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

  if (type === 1) {
    updateProgramList().then(respond).catch(onError);
  } else {
    pushProgramlist().then(respond).catch(onError);
  }
};

exports.startProgramList = (req, res) => {
  const programList = req.body.programList;
  programList.map(item => (item.name = decodeURI(item.name)));
  const type = Number(req.body.type);
  const mac = req.body.mac;

  const pushProgramlist = () => {
    return Computer.update(
      { mac },
      { $push: { startProgramList: { $each: programList } } }
    );
  };

  const updateProgramList = () => {
    return Computer.findOneAndUpdate(
      { mac },
      { startProgramList: programList },
      { new: true }
    );
  };
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

  if (type === 1) {
    updateProgramList().then(respond).catch(onError);
  } else {
    pushProgramlist().then(respond).catch(onError);
  }
};

exports.isPower = (req, res) => {
  const isPower = req.body.power;
  const mac = req.body.mac;
  const updateProgramList = () => {
    return Computer.findOneAndUpdate({ mac }, { isPower }, { new: true });
  };
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

  updateProgramList().then(respond).catch(onError);
};

exports.isLock = (req, res) => {
  const isLock = req.body.lock;
  const mac = req.body.mac;
  const updateProgramList = () => {
    return Computer.findOneAndUpdate({ mac }, { isLock }, { new: true });
  };
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

  updateProgramList().then(respond).catch(onError);
};

exports.install = (req, res) => {
  // 설치 응답.
};

exports.delete = (req, res) => {
  // 삭제 응답.
};
