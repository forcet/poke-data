import { Router, Request, Response, NextFunction } from "express";
import { Pokemon } from "../model/Pokemon.js";
import { getDB } from "../config/Database.js";

const router = Router();

router.post("/createData", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as Pokemon;
    const db = getDB();
    const existPokemon = await db
      .collection<Pokemon>("pokemon")
      .findOne({ code: body.code });

    if (existPokemon) {
      return res.status(200).json({
        message: "Ya existe un item con ese nombre",
        insertedId: existPokemon._id,
      });
    }
    const result = await db.collection<Pokemon>("pokemon").insertOne(body);
    return res.status(201).json({
      message: "Item insertado correctamente",
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("Error insertando datos:", error);
    next(error);
  }
});

router.get("/getData", async (_req: Request, res: Response) => {
  try {
    const db = getDB();
    const items = await db.collection<Pokemon>("pokemon").find({}).toArray();
    return res.json(items);
  } catch (error) {
    console.error("Error consultando data:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/data/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = Number(id); 
    if (Number.isNaN(numericId)) {
      return res
        .status(400)
        .json({ error: "El parámetro :id debe ser numérico" });
    }
    const db = getDB();
    const item = await db
      .collection<Pokemon>("pokemon")
      .findOne({ code: numericId});
    if (!item) {
      return res.status(404).json({ message: "Pokemon no encontrado" });
    }
    return res.json(item);
  } catch (error) {
    console.error("Error consultando data por id:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/data/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const numericId = Number(id); 
      if (Number.isNaN(numericId)) {
        return res
          .status(400)
          .json({ error: "El parámetro :id debe ser numérico" });
      }
      const db = getDB();
      const result = await db
        .collection<Pokemon>("pokemon")
        .deleteOne({ code: numericId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Item no encontrado" });
      }
      return res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
      console.error("Error eliminando item:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

export default router;