import { Router } from "express";
import {
  refreshToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", signIn);
router.post("/register", signUp);
router.get("/refreshToken", refreshToken);
router.delete("/logout", signOut);

export default router;
