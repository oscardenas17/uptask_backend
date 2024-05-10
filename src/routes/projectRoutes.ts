import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body } from "express-validator";
import { handleInputsErrors } from "../middleware/validation";

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

export default router;
