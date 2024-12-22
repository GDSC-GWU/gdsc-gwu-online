import {firebaseApp,fireStoreDB, fireStorageDB} from '../config/firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
import Member from '../models/memberModel.js';


import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc
} from 'firebase/firestore';


export const createMember = async (req,res,next)=>{
    try{
        const data = req.body;
        const member_photo = req.files[0];

        const storageRef = ref(fireStorageDB, `members/${data.name}_${Date.now()}_${member_photo.originalname}`);

        const snapshot = await uploadBytes(storageRef, member_photo.buffer, {
            contentType: member_photo.mimetype,
        });

        const photoURL = await getDownloadURL(snapshot.ref);
        data.photoURL = photoURL
        delete(data.photo)

        console.log(data)   
        const docRef = await addDoc(collection(fireStoreDB, "members"),data);
        res.status(200).send('member created sucessfully');
    }catch(error){
        res.status(400).send(error.message)
    }
}

export const getMembers = async (req,res,next)=>{
    try{

        const members = await getDocs(collection(fireStoreDB, 'members'));
        const memberArray = [];
        if (members.empty){
            res.status(400).send('No members found');
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

            res.status(200).send(memberArray)
        }

    }catch (error){
        res.status(400).send(error.message)
    }
}

export const deleteMember = async (req,res,next)=>{
    try{

        const memberId = req.body.id;

        if (!memberId){
            res.status(400).send("ID not found!");
        }

        const memberDoc = doc(fireStoreDB, "members", memberId);
        const memberDocSnap = await getDoc(memberDoc);

        if (memberDocSnap.exists()){
            const previousPhotoURL = memberDocSnap.data().photoURL;
            console.log(previousPhotoURL);

            if (previousPhotoURL){
                const fileRef = ref(fireStorageDB, previousPhotoURL)
                await deleteObject(fileRef)
            }

        }
        await deleteDoc(memberDoc);
        res.status(200).send("Member Deleted Successfully!")

    }catch(error){
        res.status(400).send(error.message)
    }
}

export const updateMember = async (req,res,next)=>{
    try{

        const {id, ...updatedData} = req.body;

        if( !id || Object.keys(updatedData).length ==0){
            res.status(400).send("Id and Updated Data required");
        }

        console.log(updatedData)
        const memberDoc = doc(fireStoreDB, "members", id);
        const memberDocSnap = await getDoc(memberDoc);


        if (memberDocSnap.exists()){
            const previousPhotoURL = memberDocSnap.data().photoURL;

            if (previousPhotoURL && req.files[0]){
                console.log("HEYYYY")
                const fileRef = ref(fireStorageDB, previousPhotoURL);
                await deleteObject(fileRef);

                const member_photo = req.files[0];
                const storageRef = ref(fireStorageDB, `members/${updatedData.name}_${Date.now()}_${member_photo.originalname}`);
                
                const snapshot = await uploadBytes(storageRef, member_photo.buffer, {
                    contentType: member_photo.mimetype,
                });

                const photoURL = await getDownloadURL(snapshot.ref);
                updatedData.photoURL = photoURL

            }

        }


        await updateDoc(memberDoc, updatedData);
        res.status(200).send(`Member with ID: ${id} has been updated successfully`);


    }catch (error){
        res.status(400).send(error.message);
    }
}