import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Credenciales invalidas") {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    return res.status(500).json({
      message: "Error interno en el servidor",
      error: error.message,
    });
  }
};
