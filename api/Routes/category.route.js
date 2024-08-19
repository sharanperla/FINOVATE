import express from 'express'
import { createCategory, deleteCategory, getCategories, getCategoryById } from '../Controllers/categories.controller.js';


const router=express.Router();


router.post("/createcategory",createCategory);
router.get("/getcategorybyid/:Id",getCategoryById);
router.get("/getcategories/:userId",getCategories);
router.delete("/deletecategory/:Id",deleteCategory);

export default router
