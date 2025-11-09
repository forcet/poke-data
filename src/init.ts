import express, { Request, Response, NextFunction } from "express";
import pokemonRoute from "./routes/PokemonRoute.js";
import heralthRoute from "./routes/HealthRoute.js";
import readinessRoute from "./routes/ReadinessRoute.js";
import startRoute from "./routes/StartupRoute.js";

const app = express();
app.use(express.json());
app.use(pokemonRoute);
app.use(heralthRoute);
app.use(readinessRoute);
app.use(startRoute);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Error interno" });
});

export default app;
