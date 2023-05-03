//XmlHttpRequest Approach
import {warningSign, userName, items, categories, codContainer} from '../globalVar.js';
var httpRequest;
var utente;
var logged=false;

const MakeRequest= (TYPE,REQUEST="",URL="")=>{
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) { throw new Error("on making the request to the server").catch((e)=>{console.err(e.message);});}
    switch(TYPE){
        case "SignUp":{
            httpRequest.onreadystatechange = CheckStateSignUp;
            httpRequest.open("POST", "/SignUp");
            httpRequest.setRequestHeader("Authorization", AuthenticateUser(REQUEST.username, REQUEST.password))
            httpRequest.send();
            return;
        }
        case "SignIn":{
            utente=REQUEST.username;
            httpRequest.onreadystatechange = CheckStateSignIn;
            httpRequest.open("POST", "/SignIn");
            httpRequest.setRequestHeader("Authorization", AuthenticateUser(REQUEST.username, REQUEST.password))
            httpRequest.send();
            return;
        }
        case "SaveWork":{
            //salvare il lavoro, dentro la cartella "works" nel server, come un file di nome=nome utente 
            if(!logged) return;
            let obj={username:utente, dati:MakeObjToSave()};
            console.log(obj);
            httpRequest.onreadystatechange = CheckStateSignUp;
            httpRequest.open("POST", "/SaveWork");
            httpRequest.setRequestHeader(
                "Content-Type",
                "application/json"
              );
            httpRequest.send(JSON.stringify(obj));
            
            return;
        }
        case "GET":{
            httpRequest.onreadystatechange = CheckStateAuth;
            httpRequest.open("GET", URL);
            httpRequest.send(URL);
            return;
        }
    }
}

function AuthenticateUser(username, password){
    let token=username+":"+password;
    //var hash=Buffer.from(token,'base64');
    return token;
}

function CheckStateSignUp() {
    try{
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            warningSign.value=httpRequest.responseText;
            } else {
            console.log("There was a problem with the request.");
            warningSign.value="ERROR";
            }
        }
    }
    catch(e){console.err(e.message);}
}

const CheckStateSignIn=()=>{
    try{
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            switch(httpRequest.status) {
                case 200: {
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response.message);
                    warningSign.value=response.message;
                    if(!response.permission)return;
                    console.log(response.dati); 
                    LoadSave(response.dati);
                    logged=true;
                    userName.value=utente;
                }
                break;
                case 404: {
                    throw new Error("offline");
                }
                default: {
                    console.error("There was a problem with the request. try to verify your connection");
                    warningSign.value="There was a problem with the request. try to verify your connection";
                }
            }
        }
    }
    catch(e){console.error(e);}
}

function LoadSave(obj){
    //manca di pulire items
    console.log(obj);
    try{
        for(let item in obj["notes"]){
            items.value[item]=obj["notes"][item];
            items.value[item]["lastaccess"]=new Date(); //Date.parse(items[item]["lastaccess"] DA RIVEDERE! problema convertire stringa in date().
    }}catch(e){console.log("error on loading the notes (function LoadSave): "+e);}
    try{
        for(let item in obj["categories"]){
            categories.value[item]=obj["categories"][item];
    }}catch(e){console.log("error on loading the categories (function LoadSave): "+e);}
    try{
        for(let item in obj["codContainer"]){
            codContainer[item]=obj["codContainer"][item];
    }}catch(e){console.log("error on loading the codContainer (function LoadSave): "+e);}
}

function MakeObjToSave(){
    //variabili app = dati salvati dall'utente;
    var [objNotes, objCategories, objCodContainer]=[{},{},{}];
    for(let item in items.value){
        objNotes[item]=items.value[item];
    }
    for(let category in categories.value){
        objCategories[category]=categories.value[category];
    }
    for(let cod in codContainer){
        objCodContainer[cod]=codContainer[cod];
    }
    return {"notes":objNotes,"categories":objCategories,"codContainer":objCodContainer};
}

export {MakeRequest}