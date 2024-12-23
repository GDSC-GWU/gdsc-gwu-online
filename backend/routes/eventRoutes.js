import {createEvent,getEvents,deleteEvent,updateEvent} from '../controllers/eventControllers.js';
import router from './router.js';

router.post("/createEvent", createEvent);
router.get("/getEvents", getEvents);
router.post("/deleteEvent", deleteEvent);
router.post("/updateEvent", updateEvent);


export default router;