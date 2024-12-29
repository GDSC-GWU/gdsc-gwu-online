import router from './router.js';

import {firebaseAuthController} from '../controllers/firebaseAuthControllers.js'

router.post("/login", firebaseAuthController.loginUser);
router.post("/logout", firebaseAuthController.logoutUser);

export default router;
