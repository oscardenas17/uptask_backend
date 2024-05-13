import type { Response, Request } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      //req.project.xxx  viene del middleware gracias al declare global
      const taskData = { ...req.body, project: req.project.id };
      const task = new Task(taskData);

      req.project.tasks.push(task.id);

      //Mejora en lugar de usar los dos save, se usa Promise.allSettled para que se lancen los dos save al tiempo
      // await task.save();
      // await req.project.save();
      await Promise.allSettled([task.save(), req.project.save()]);

      res.send("Tarea creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }

      if (task.project.toString() !== req.project.id) {
        const error = new Error(
          "Acción no válida, La tarea no corresponde al proyecto"
        );
        return res.status(400).json({ error: error.message });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndUpdate(taskId, req.body);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }

      if (task.project.toString() !== req.project.id) {
        const error = new Error(
          "Acción no válida, La tarea no corresponde al proyecto"
        );
        return res.status(400).json({ error: error.message });
      }

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
