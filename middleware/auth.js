const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).send({ message: "Invalid token." });
  }
};

exports.authRefreshToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    jwt.verify(
      token,
      secret,
      async (err, user) => {
        if (err) return res.status(403).send({ message: err.message });

        const accessToken = await generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });

        next();
      },
      null
    );
  } catch (ex) {
    res.status(400).send({ message: "Invalid token." });
  }
};
