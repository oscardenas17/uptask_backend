import type { NextFunction, Response, Request } from "express";
import Task, { Itask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: Itask;
    }
  }
}

export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({ error: error.message });
    }

    //Se pasa como global tasks, para que en el ambito de req, se pueda leer
    req.task = task;
    //Si el task existe
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}

export function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error(
      "Acción no válida, La tarea no corresponde al proyecto"
    );
    return res.status(400).json({ error: error.message });
  }

  next();
}
