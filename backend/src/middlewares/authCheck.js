function checkToken(req, res, next) {
  const token = req.cookies.token
  if(!token) {
    return ({
      status: 401
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    return ({
      status: 200
    })
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expiradooo", token, secret: process.env.JWT_SECRET });
  }
}

module.exports = checkToken