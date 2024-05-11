import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputsErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clienteName")
    .notEmpty()
    .withMessage("El nombre del cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La descripción es Obligatoria"),
  handleInputsErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputsErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clienteName")
    .notEmpty()
    .withMessage("El nombre del cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La descripción es Obligatoria"),
  handleInputsErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputsErrors,
  ProjectController.deleteProject
);

/** ROUTES FOR TASKS */
router.post(
  "/:projectId/tasks",
  validateProjectExists,
  TaskController.createTask
);

export default router;
