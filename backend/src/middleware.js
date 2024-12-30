import {admin} from "../config/firebase.js";

export const verifyToken = async(request, response, next) =>{
    
    const idToken = request.cookies.access_token;

    if(!idToken){
        return response.status(403).send('No token provided');
    }

    try{

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        request.user = decodedToken;
        next();

    }catch (error){
        return response.status(403).send('Unauthorized');
    }
}
