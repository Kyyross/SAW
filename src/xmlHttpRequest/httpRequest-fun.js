//XmlHttpRequest Approach
import { warningSign, userName, items, categories, codContainer, itemData_Auth} from '../globalVar.js';
var httpRequest;

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
            userName.temp=REQUEST.username;
            httpRequest.onreadystatechange = CheckStateSignIn;
            httpRequest.open("POST", "/SignIn");
            httpRequest.setRequestHeader("Authorization", AuthenticateUser(REQUEST.username, REQUEST.password))
            httpRequest.send();
            return;
        }
        case "SaveWork":{
            //salvare il lavoro, dentro la cartella "works" nel server, come un file di nome=nome utente 
            if(!userName.logged) return;
            let obj={username:userName.value, dati:MakeObjToSave()};
            window.localStorage.setItem(userName.value,JSON.stringify(obj.dati));
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
            switch(httpRequest.status){
                case 201:{
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response["metadati"].message);
                    warningSign.value=response["metadati"].message;
                }break;
                case 400:{
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response["metadati"].message);
                    warningSign.value=response["metadati"].message;
                }break;
                case 500:{
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response["metadati"].message);
                    warningSign.value=response["metadati"].message;
                }break;
                default:{
                    warningSign.value="ERROR";
                    console.error("There was a problem with the request.");
                }
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
                    console.log(response["metadati"].message);
                    console.log(response.data); 
                    [warningSign.value,userName.logged,userName.value,userName.display]=[response["metadati"].message, true, userName.temp,"block"];
                    LoadSave(response.data);
                    window.localStorage.setItem("username",userName.value);
                    window.localStorage.setItem(userName.value,JSON.stringify(response.data));
                    itemData_Auth.Password="";
                    itemData_Auth.Username="";
                    itemData_Auth.cPassword="";
                }
                break;
                case 400: {
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response["metadati"].message);
                    warningSign.value=response["metadati"].message;
                }
                break;
                case 500:{
                    let response=JSON.parse(httpRequest.responseText);
                    console.log(response["metadati"].message);
                    warningSign.value=response["metadati"].message;
                }
                default: {
                    warningSign.value="There was a problem with the request. try to verify your connection";
                    console.error("There was a problem with the request. try to verify your connection");
                }
            }
        }
    }
    catch(e){console.error(e);}
}

export function LoadSave(obj){
    //manca di pulire items
    console.log(obj);
    try{
        for(let item in obj["notes"]){
            items.value[item]=obj["notes"][item];
    }}catch(e){console.error("error on loading the notes (function LoadSave): "+e);}
    try{
        for(let item in obj["categories"]){
            categories.value[item]=obj["categories"][item];
    }}catch(e){console.error("error on loading the categories (function LoadSave): "+e);}
    try{
        for(let item in obj["codContainer"]){
            codContainer[item]=obj["codContainer"][item];
    }}catch(e){console.error("error on loading the codContainer (function LoadSave): "+e);}
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