// import package here
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    // check if user send token via Authorization header or not
    if (!token) {
      // rejected request and send response access denied
      return res.status(401).send({
        message: 'Access denied!',
      });
    }
    // const SECRET_KEY = 'batch32bebasapasaja';
    // const verified = jwt.verify(token, SECRET_KEY);
    const verified = jwt.verify(token, process.env.TOKEN_KEY); //verified token
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
