import express from 'express'
import { signOut, signin, signup, updateUser } from '../Controllers/auth.controller.js';




const router=express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signOut);
router.patch("/update",updateUser);

export default router
