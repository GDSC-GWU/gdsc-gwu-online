import express from "express";

import {createMember, 
    getMembers,
    deleteMember,
    updateMember} from '../controllers/memberControllers.js'


const router = express.Router();

router.get("/getMembers", getMembers)
router.post("/createMember", createMember)
router.post("/deleteMember", deleteMember)
router.post("/updateMember", updateMember)

export default router;