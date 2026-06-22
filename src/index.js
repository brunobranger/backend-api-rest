import "dotenv/config";
import express from "express";
import cors from "cors";
import productRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Cors
const corsOptions = {
  origin: ["http://localhost:5500"],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando desde index.js correctamente");
});

app.use("/api/products", productRouter);

// Middleware para rutas desconocidas
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "La ruta solicitada no existe",
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
