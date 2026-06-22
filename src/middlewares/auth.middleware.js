import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error:
        "Acceso denegado. No se ha proporcionado un token de autenticacion",
    });
  }

  try {
    const verifiedData = jwt.verify(token, JWT_SECRET);
    req.user = verifiedData;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Token invalido o expirado. Acceso no autorizado",
    });
  }
};
