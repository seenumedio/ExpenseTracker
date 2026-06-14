const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
     // Look for the Authorization header
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
  // Extract the token after "Bearer "
  const token = authHeader.split(' ')[1];
  try{
    // Verify token and attach user payload to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({success:false, mssg: 'Invalid token'})
  }
}
module.exports = auth