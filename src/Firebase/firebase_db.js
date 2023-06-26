import { app } from "./firebase_config.js";
import { setDoc, updateDoc, doc, getDoc, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, query } from 'firebase/firestore';
import {MakeObjToSave, LoadSave} from '../xmlHttpRequest/httpRequest-fun.js';
import { userStore } from "./firebase_auth.js";

const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
export function createFirebaseStore() {
    const istance={ id:"", workQuery:""};
    
    const SetId = async()=>{
        istance.id=userStore.credentials.id;
        istance.workQuery = query(doc(db, "utenti", istance.id));
    }

    const loadWork = async () => {
        console.log(istance.id);
        console.log(istance.workQuery);
        try{
            const res = await getDoc(istance.workQuery);
            Initializedb(res,istance.id);
            console.log(res);
            let ob=res.data();
            LoadSave(ob);
        }catch(e){console.error(e);}
    }

    const addWork = async (key,obj,bool=true) => {
        //const obj= MakeObjToSave();
        console.log(obj); // {Bar:obj}
        console.log(istance.id,istance.workQuery);
        try {
            await setDoc(doc(db, "utenti", istance.id), obj, {merge:bool});
        } catch (e) {
            console.error(`Error adding ${obj}`, e);
        }
    }
    
    const addWorkall = async () => {
        const obj= MakeObjToSave();
        console.log(obj); // {Bar:obj}
        console.log(istance.id,istance.workQuery);
        try {
            await setDoc(doc(db, "utenti", istance.id), obj);
        } catch (e) {
            console.error(`Error adding ${obj}`, e);
        }
    }

    const updateWork= async (obj) =>{
        console.log(obj);
        try{
            await updateDoc(doc(db,"utenti",istance.id),obj);
        }catch(e){
            console.error(e);
        }
    }

    return {
       SetId, loadWork, addWork, addWorkall, updateWork
    }
}

const Initializedb= async(res,id)=>{
    try{
        if(res.exists()) return undefined;
        let obj={"categories":{},"notes":{},"codContainer":{}};
        await setDoc(doc(db,"utenti", id),obj);
        return obj;
    }
    catch(e){console.error("error on initializing the db in firebase ${obj}", e); return undefined}
}

export const works = createFirebaseStore();