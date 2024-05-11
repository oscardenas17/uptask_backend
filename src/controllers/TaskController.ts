import type { Response, Request } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Proyecto no encontrado");
      return res.status(404).json({ error: error.message });
    }

    try {
      const taskData = { ...req.body, project: project.id };
      const task = new Task(taskData);

      project.tasks.push(task.id);
      await task.save();
      await project.save();

      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
