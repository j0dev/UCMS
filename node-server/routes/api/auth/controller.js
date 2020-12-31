const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

exports.register = (req, res) => {
  const { userid, password, username, type } = req.body;

  let newUser = null;
  const create = user => {
    if (user) {
      throw new Error("이미 존재하는 계정입니다.");
    } else {
      return User.create(userid, password, username, type);
    }
  };

  const count = user => {
    newUser = user;
    return User.count({}).exec();
  };

  const assign = count => {
    console.log(count);
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      return Promise.resolve(false);
    }
  };
  const respond = isAdmin => {
    res.setHeader("Content-Type", "text/html");
    res.json({
      message: "회원가입이 완료되었습니다. 로그인 해주세요.",
      admin: isAdmin ? true : false
    });
  };

  // run when there is an error (username exists)
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  User.findOneByUserid(userid)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};

exports.login = (req, res) => {
  const { userid, password } = req.body;

  const secret = req.app.get("jwt-secret");
  const expiresIn = req.app.get("expiresIn");
  const refreshSecret = req.app.get("jwt-refresh-secret");
  const refreshExpiresIn = req.app.get("refreshEpiresIn");

  const check = user => {
    if (!user) {
      throw new Error("해당 계정이 존재하지 않습니다.");
    } else {
      if (user.isActive === false) {
        throw new Error("승인 대기 중입니다.");
      } else if (user.verify(password)) {
        const token = jwt.sign({ user }, secret, { expiresIn: expiresIn });
        const refreshToken = jwt.sign({ user }, refreshSecret, {
          expiresIn: refreshExpiresIn
        });

        const response = {
          token,
          refreshToken
        };

        return response;
        // refreshToken: refreshToken,
      } else {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    }
  };

  const respond = response => {
    res.setHeader("Content-Type", "text/html");
    res.json({
      message: "logined!!",
      token: response.token,
      refreshToken: response.refreshToken
    });
  };

  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  User.findOneByUserid(userid).then(check).then(respond).catch(onError);
};

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  });
};

exports.refresh = (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token) {
    return res.status(403).json({
      message: "!token"
    });
  }
  const secret = req.app.get("jwt-secret");
  const expiresIn = req.app.get("expiresIn");
  const refreshSecret = req.app.get("jwt-refresh-secret");

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, refreshSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded.user);
    });
  });

  const refreshToken = user => {
    const token = jwt.sign({ user }, secret, { expiresIn: expiresIn });
    return token;
  };

  const respond = token => {
    res.setHeader("Content-Type", "text/html");
    res.json({
      message: "refresh success!!",
      token
    });
  };

  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };
  p.then(refreshToken).then(respond).catch(onError);
};
