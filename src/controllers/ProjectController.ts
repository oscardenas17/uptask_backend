import type { Response, Request } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {

      await project.save();
      res.send("Create project");
    } catch (error) {
      
    }
 
  };

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("Todos los project");
  };
}
