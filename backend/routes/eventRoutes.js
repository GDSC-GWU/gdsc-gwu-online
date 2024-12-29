import {createEvent,getEvents,deleteEvent,updateEvent} from '../controllers/eventControllers.js';
import {verifyToken} from '../src/middleware.js';
import router from './router.js';

router.post("/createEvent",verifyToken, createEvent);
router.get("/getEvents", getEvents);
router.post("/deleteEvent",verifyToken, deleteEvent);
router.post("/updateEvent",verifyToken, updateEvent);


export default router;