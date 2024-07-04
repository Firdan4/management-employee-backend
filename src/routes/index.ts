import { Router } from "express";
import UserRoutes from "./users.routes";
import AuthRoutes from "./auth.routes";
import EmployeeRoutes from "./employee.routes";

const router = Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/employee", EmployeeRoutes);

export default router;
