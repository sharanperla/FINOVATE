import express from 'express'
import { signOut, signin, signup } from '../Controllers/auth.controller.js';


const router=express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signOut);

export default router
