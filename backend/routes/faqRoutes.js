import {createFAQ, getFAQs, deleteFAQ, updateFAQ} from '../controllers/faqControllers.js';
import router from './router.js';
import {verifyToken} from '../src/middleware.js';

router.post("/createFAQ", verifyToken, createFAQ);
router.get("/getFAQs", getFAQs);
router.post("/deleteFAQ", verifyToken, deleteFAQ);
router.post("/updateFAQ", verifyToken, updateFAQ);


export default router;