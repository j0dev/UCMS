const Building = require("../../../models/building");

exports.list = (req, res, next) => {
  //   if (!req.decoded.isAdmin) {
  //     return res.status(403).json({
  //       message: "you are not admin",
  //     });
  //   }

  // const page = User.findOneByUserid(req.params.userid);

  Building.find({}).then((buildings) => {
    res.json({
      status: true,
      data: buildings,
    });
  });
};

exports.create = (req, res) => {
  const name = req.body.name;
  const create = (building) => {
    if (building) {
      throw new Error("Buliding exists");
    } else {
      return Building.create(name);
    }
  };

  const respond = () => {
    res.json({
      status: true,
      data: "Building Add Success",
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      status: false,
      data: error.message,
    });
  };

  Building.findOneByBuilding(name).then(create).then(respond).catch(onError);
};

exports.update = (req, res) => {
  const _id = req.body.id;
  const name = req.body.name;
  const update = (building) => {
    if (!building) {
      throw new Error("Buliding not exists");
    } else {
      return Building.update(_id, name);
    }
  };
  const respond = () => {
    res.json({
      status: true,
      data: "Building Update Success",
    });
  };

  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(409).json({
      status: false,
      data: error.message,
    });
  };

  Building.findOneByBuildingId(_id).then(update).then(respond).catch(onError);
};
