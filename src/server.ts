

import { connectToDB } from "./config/Database.js";
import app from "./init.js";

const PORT = process.env.APP_PORT ?? 3001;

try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al iniciar la app:", err);
    process.exit(1);
}