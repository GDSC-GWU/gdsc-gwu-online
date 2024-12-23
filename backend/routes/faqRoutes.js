import {createFAQ, getFAQs, deleteFAQ, updateFAQ} from '../controllers/faqControllers.js';
import router from './router.js';

router.post("/createFAQ", createFAQ);
router.get("/getFAQs", getFAQs);
router.post("/deleteFAQ", deleteFAQ);
router.post("/updateFAQ", updateFAQ);


export default router;