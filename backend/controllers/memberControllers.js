import {fireStoreDB, fireStorageDB} from '../config/firebase.js';
import {ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
import Member from '../models/memberModel.js';


import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';


export const createMember = async (request,response,next)=>{
    try{
        const data = request.body;
        const member_photo = request.files[0];

        const storageRef = ref(fireStorageDB, `members/${data.name}_${Date.now()}_${member_photo.originalname}`);

        const snapshot = await uploadBytes(storageRef, member_photo.buffer, {
            contentType: member_photo.mimetype,
        });

        const photoURL = await getDownloadURL(snapshot.ref);
        data.photoURL = photoURL
        delete(data.photo) 
        const docRef = await addDoc(collection(fireStoreDB, "members"),data);
        response.status(200).send('member created sucessfully');
    }catch(error){
        response.status(400).send(error.message)
    }
}

export const getMembers = async (request,response,next)=>{
    try{

        const members = await getDocs(collection(fireStoreDB, 'members'));
        const memberArray = [];
        if (members.empty){
            response.status(400).send('No members found');
        }else{
            members.forEach((doc)=>{
                const data = doc.data()
                const member = new Member(
                    data.name,
                    data.year,
                    data.title,
                    data.email,
                    data.github,
                    data.linkedin,
                    data.photoURL,
                    doc.id
                    )
                memberArray.push(member)
            });

            response.status(200).send(memberArray)
        }

    }catch (error){
        response.status(400).send(error.message)
    }
}

export const deleteMember = async (request,response,next)=>{
    try{

        const memberId = request.body.id;

        if (!memberId){
            response.status(400).send("ID not found!");
        }

        const memberDoc = doc(fireStoreDB, "members", memberId);
        const memberDocSnap = await getDoc(memberDoc);

        if (memberDocSnap.exists()){
            const previousPhotoURL = memberDocSnap.data().photoURL;
            if (previousPhotoURL){
                const fileRef = ref(fireStorageDB, previousPhotoURL)
                await deleteObject(fileRef)
            }

        }
        await deleteDoc(memberDoc);
        response.status(200).send("Member Deleted Successfully!");

    }catch(error){
        response.status(400).send(error.message)
    }
}

export const updateMember = async (request,response,next)=>{
    try{

        const {id, ...updatedData} = request.body;

        if( !id || Object.keys(updatedData).length ==0){
            response.status(400).send("Id and Updated Data required");
        }

        console.log(updatedData)
        const memberDoc = doc(fireStoreDB, "members", id);
        const memberDocSnap = await getDoc(memberDoc);


        if (memberDocSnap.exists()){
            const previousPhotoURL = memberDocSnap.data().photoURL;

            if (previousPhotoURL && request.files[0]){
                const fileRef = ref(fireStorageDB, previousPhotoURL);
                await deleteObject(fileRef);

                const member_photo = request.files[0];
                const storageRef = ref(fireStorageDB, `members/${updatedData.name}_${Date.now()}_${member_photo.originalname}`);
                
                const snapshot = await uploadBytes(storageRef, member_photo.buffer, {
                    contentType: member_photo.mimetype,
                });

                const photoURL = await getDownloadURL(snapshot.ref);
                updatedData.photoURL = photoURL

            }

        }


        await updateDoc(memberDoc, updatedData);
        response.status(200).send(`Member with ID: ${id} has been updated successfully`);


    }catch (error){
        response.status(400).send(error.message);
    }
}