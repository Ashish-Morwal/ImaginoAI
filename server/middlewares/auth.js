import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log("AUTH HEADER:", authHeader); // 👈 Debug log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED:", decoded); // 👈 Debug log

    if (decoded?.id) {
      req.body.userId = decoded.id;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login again." });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
