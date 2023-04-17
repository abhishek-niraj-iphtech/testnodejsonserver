const jwt = require("jsonwebtoken");
const role = ["admin", "hr"];
exports.checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, "iph123", (err, decode) => {
      if (err) {
        return res.json({
          statusCode: 401,
          status: "failed",
          message: "Invalid Token..",
        });
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    return res.json({
      statusCode: 401,
      status: "failed",
      message: "Access Denied ! Unauthorized User",
    });
  }
};

exports.checkAdmin = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, "iph123", (err, decode) => {
      if (!role.includes(decode.result[0]["emp_role"])) {
        return res.json({
          statusCode: 401,
          status: "failed",
          message: "Access Denied ! Unauthorized User",
        });
      } else {
        req.decode = decode;
        next();
      }
    });
  }
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.emp_id) {
    return res.json({
      statusCode: 400,
      status: "failed",
      message: "Missing id",
    });
  }
  next();
};

exports.checkUser = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, "iph123", (err, decode) => {
      if (!role.includes(decode.result[0]["emp_role"])) {
        if (req.body.id !== decode.result[0]["id"]) {
          return res.json({
            statusCode: 401,
            status: "failed",
            message: "Access Denied ! Unauthorized User",
          });
        } else {
          req.decode = decode;
          next();
        }
      } else {
        req.decode = decode;
        next();
      }
    });
  }
};

exports.checkemplyoee = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, "iph123", (err, decode) => {
      if (!role.includes(decode.result[0]["emp_role"])) {
        req.decode = decode;
        next();
      } else {
        return res.json({
          statusCode: 401,
          status: "failed",
          message: "Access Denied ! Unauthorized User",
        });
      }
    });
  }
};

// function tokenData(req) {
//   let token = req.get("authorization");
//   token = token.slice(7);
//   var decodedData;
//   if (token) {
//     jwt.verify(token, "iph123", (err, decode) => {
//       if (err) {
//         decodedData = true;
//       } else {
//         decodedData = false;
//       }
//     });
//   } else {
//     return res.json({
//       statusCode: 401,
//       status: "failed",
//       message: "Access Denied ! Unauthorized User",
//     });
//   }
//   return decodedData;
// }
