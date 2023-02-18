//AJAX Approach
import {warningSign, userName} from '../globalVar.js';
var httpRequest;
var utente;

const MakeRequest=(TYPE,REQUEST="",URL="")=>{
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
            if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            warningSign.value=httpRequest.responseText;
            userName.value=utente;
            } else {
            console.log("There was a problem with the request.");
            warningSign.value="ERROR";
            }
        }
    }
    catch(e){console.err(e.message);}
}

export {MakeRequest}