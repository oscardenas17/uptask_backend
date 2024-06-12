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
  

      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
     

      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Tarea Eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateSatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
     
      req.task.status = status;
      await req.task.save();

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error, valida el dato enviado" });
    }
  };
}
