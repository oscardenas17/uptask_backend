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
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es Obligatoria"),
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

router.param("projectId", validateProjectExists);
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es Obligatoria"),
  handleInputsErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id no válido"),
  handleInputsErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id no válido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es Obligatoria"),
  handleInputsErrors,
  TaskController.updateTask
);

export default router;
