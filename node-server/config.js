module.exports = {
  secret: "SeCrEtKeYfOrHaShInG",
  refreshSecret: "5f13f343a53bbe1b3ca6418a9b4bf855",
  tokenLife: 3600,
  refreshTokenLife: 86400,
  mongodbUri: "mongodb://localhost/ucms",
  corsOption: {
    origin: "http://localhost:20080",
    credentials: true,
  },
};
