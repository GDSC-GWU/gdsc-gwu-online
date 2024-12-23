import express from "express";
import router from './router.js';

import {createMember, 
    getMembers,
    deleteMember,
    updateMember} from '../controllers/memberControllers.js'

router.get("/getMembers", getMembers)
router.post("/createMember", createMember)
router.post("/deleteMember", deleteMember)
router.post("/updateMember", updateMember)

export default router;