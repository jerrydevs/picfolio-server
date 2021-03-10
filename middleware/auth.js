const jwt = require('jsonwebtoken')

// Middleware to authorize user using jwt token
// API requests to routes using this middleware
// must contain 'auth-token' field in header
module.exports = function (req, res, next) {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token ' })
  }

  try {
    const tokenSecret = process.env.tokenSecret || 'mytemporarysecret'
    const decode = jwt.verify(token, tokenSecret)

    req.user = decode.user
    next()
  } catch (err) {
    console.error(err.message)
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
