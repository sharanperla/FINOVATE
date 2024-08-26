import express from 'express'
import { signOut, signin, signup, updateUser } from '../Controllers/auth.controller.js';
import multer from 'multer';


const upload = multer();

const router=express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signOut);
router.patch("/update", upload.single('profileImage'),updateUser);

export default router
