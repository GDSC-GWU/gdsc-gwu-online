import {fireStoreDB, fireStorageDB} from '../config/firebase.js';
import Event from '../models/eventModel.js';

import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';


export const createEvent = async (request, response, next) =>{
    try{
        const data = request.body;
        const event_photo = request.files[0];

        const storageRef = ref(fireStorageDB, `events/${data.name}_${Date.now()}_${event_photo.originalname}`);
        
        const snapshot = await uploadBytes(storageRef, event_photo.buffer, {
            contentType: event_photo.mimetype,
        });

        const photoURL = await getDownloadURL(snapshot.ref);
        data.photoURL = photoURL;
        delete(data.photo);

        const docref = await addDoc(collection(fireStoreDB, "events"), data);
        response.status(200).send('event created successfully');
    }catch (error){
        response.status(400).send(error.message);
    }
}

export const getEvents = async (request, response, next)=>{
    
    try{    
        const events = await getDocs(collection(fireStoreDB, 'events'));
        const eventArray = [];

        if (events.empty){
            response.status(400).send('No events found');
        }else{
            events.forEach((doc)=>{
                const data  = doc.data();
                const event  = new Event(
                    data.name,
                    data.fromDateTime,
                    data.toDateTime,
                    data.url,
                    data.loaction,
                    data.photoURL,
                    doc.id
                );
                eventArray.push(event);
            });

            response.status(200).send(eventArray);
        }
    }catch (error){
        response.status(400).send(error.message);
    }
}

export const deleteEvent = async (request, response, next)=>{

    try{
        const eventId = request.body.id;

        if (!eventId){
            response.status(400).send("ID not found!");
        }

        const eventDoc  = doc(fireStoreDB, "events", eventId);
        const eventDocSnap = await getDoc(eventDoc);

        if(eventDocSnap.exists()){
            const previousPhotoURL = eventDocSnap.data().photoURL;
            if (previousPhotoURL){
                const fileRef = ref(fireStorageDB, previousPhotoURL);
                await deleteObject(fileRef);
            }
        }
        await deleteDoc(eventDoc);
        response.status(200).send("Event Deleted Successfully!");
    }catch (error){
        response.status(400).send(error.message);
    }
}

export const updateEvent = async (request, response,next)=>{

    try{    
        
        const {id, ...updatedData} = request.body;

        if(!id || Object.keys(updatedData).length == 0){
            response.status(400).send("Id and updated data required");
        }

        const eventDoc = doc(fireStoreDB, "events", id);
        const eventDocSnap = await getDoc(eventDoc);

        if (eventDocSnap.exists()){
            const previousPhotoURL = eventDocSnap.data().photoURL;

            if(previousPhotoURL && request.files[0]){
                const fileRef = ref(fireStorageDB, previousPhotoURL);
                await deleteObject(fileRef);

                const event_photo = request.files[0];
                const storageRef = ref(fireStorageDB, `events/${updatedData.name}_${Date.now()}_${event_photo.originalname}`);

                const snapshot = await uploadBytes(storageRef, event_photo.buffer, {
                    contentType: event_photo.mimtype,
                });

                const photoURL = await getDownloadURL(snapshot.ref);
                updatedData.photoURL;
            }
        }

        await updateDoc(eventDoc, updatedData);
        response.status(200).send(`Event with ID: ${id} has been updated successfully`);
    }catch (error){
        response.status(400).send(error.message);
    }

}