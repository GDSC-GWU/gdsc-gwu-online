import {fireStoreDB, fireStorageDB} from '../config/firebase.js';
import {ref,uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import FAQ from '../models/faqModel.js';

import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';


export const createFAQ = async (request,response,next)=>{

    try{    
        const data = request.body;

        const docRef = await addDoc(collection(fireStoreDB, "faqs"), data);
        response.status(200).send('faq created sucessfully');
    }catch (error){
        response.status(400).send(error.message);
    }
    
}

export const getFAQs = async (request, response, next)=>{

    try{
        const faqs = await getDocs(collection(fireStoreDB, 'faqs'));
        const faqArray = []

        if (faqs.empty){
            response.status(400).send('No FAQs found');
        }else{
            faqs.forEach((doc)=>{
                const data = doc.data();
                const faq = new FAQ(
                    data.question,
                    data.answer,
                    doc.id
                );
                faqArray.push(faq);
            });

            response.status(200).send(faqArray);
        }
    }catch (error){
        response.status(400).send(error.message);
    }
}

export const deleteFAQ = async (request, response, next)=>{

    try{    
        const faqId = request.body.id;

        if (!faqId){
            response.status(400).send("ID not found!");
        }

        const faqDoc = doc(fireStoreDB, "faqs", faqId);
        const faqDocSnap = await getDoc(faqDoc);

        await deleteDoc(faqDoc);
        response.status(200).send("FAQ Deleted Successfully");
    }catch (error){
        response.status(400).send(error.message);
    }

}


export const updateFAQ = async (request, response, next)=>{
    
    try{  
        const {id, ...updatedData} = request.body;

        if(!id || Object.keys(updatedData).length == 0){
            response.status(400).send("Id and updated data required");
        };

        const faqDoc = doc(fireStoreDB, "faqs", id);
        const faqDocSnap = await getDoc(faqDoc);

        await updateDoc(faqDoc, updatedData);
        response.status(200).send(`FAQ with ID: ${id} has been updated successfully`)
    }catch (error){
        response.status(400).send(error.message);
    }
}