import express from "express";
import router from './router.js';

import {createMember, 
    getMembers,
    deleteMember,
    updateMember} from '../controllers/memberControllers.js';

import {verifyToken} from '../src/middleware.js';


router.get("/getMembers", getMembers)
router.post("/createMember", verifyToken, createMember)
router.post("/deleteMember", verifyToken, deleteMember)
router.post("/updateMember", verifyToken, updateMember)

export default router;