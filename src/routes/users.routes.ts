import { Router, Request, Response } from "express";
import { getUsers } from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);

export default router;
