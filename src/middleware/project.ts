import type { NextFunction, Response, Request } from "express";
import Project, { IProject } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function projectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    console.log(projectId);
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Proyecto no encontrado");
      return res.status(404).json({ error: error.message });
    }

    //Se pasa como glopbal projectm, para que en el ambio de req, se pueda leer
    req.project = project;
    //Si el proyecto existe
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
