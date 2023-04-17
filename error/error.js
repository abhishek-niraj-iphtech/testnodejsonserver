const sometgingWentWrong = (req, res) => {
  res.json({
    statusCode: 400,
    status: "failed",
    message: "something went wrong",
  });
};

module.exports = {
  sometgingWentWrong,
};
