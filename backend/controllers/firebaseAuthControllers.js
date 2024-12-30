import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,  sendEmailVerification, sendPasswordResetEmail} from 'firebase/auth';

const auth = getAuth();

class FirebaseAuthController{

    registerUser(request, response){
        const {email, password} = request.body;
        if(!email || !password){
            return response.status(422).send('Email and Password is Required');

        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                sendEmailVerification(auth.currentUser)
                    .then(()=>{
                        response.status(201).send('Verification Mail mail sent! User Created successfully')
                    });
            })
            .catch((error)=>{
                response.status(500).send('Error Sending Email Verification!')
            });
    }

    loginUser(request, response){

        const {email, password} = request.body;

        if( !email || !password ){
            response.status(422).send('Email and Password is required!');
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{

                const idToken = userCredential._tokenResponse.idToken;
                if(idToken){
                    response.cookie('access_token', idToken, {
                        httpOnly: true
                    });
                    response.status(200).send('User Logged in successfully');
                }else{
                    response.status(500).send('Internal Server Error');
                }
            })
            .catch((error)=>{
                response.status(500).send(error.message);
            })

    }

    logoutUser(request, response){
        signOut(auth)
            .then(()=>{
                response.clearCookie('access_token');
                response.status(200).send('User logged out successfully');
            })
            .catch((error)=>{
                response.status(500).send('Internal Server Error');
            })
    }

    resetPassword(request, response){
        const {email} = request.body;

        if(!email){
            response.status(422).send('Emal is required');
        }

        sendPasswordResetEmail(auth, email)
            .then(()=>{
                response.status(200).send('Password reset email sent successfully!');

            })
            .catch((error)=>{
                response.status(500).send('Internal Server Error');
            })
    }
}

export const firebaseAuthController = new FirebaseAuthController();