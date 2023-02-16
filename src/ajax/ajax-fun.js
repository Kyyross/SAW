//AJAX Approach

var httpRequest;

const MakeRequest=(TYPE,REQUEST="",URL="")=>{
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) { throw new Error("on making the request to the server").catch((e)=>{console.err(e.message);});}
    switch(TYPE){
        case "Auth":{
            httpRequest.onreadystatechange = CheckStateResponse;
            httpRequest.open("POST", "/SignUp");
            httpRequest.setRequestHeader("Authorization", AuthenticateUser(REQUEST.username, REQUEST.password))
            httpRequest.send();
            return;
        }
        case "GET":{
            httpRequest.onreadystatechange = CheckStateResponse;
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

function CheckStateResponse() {
    try{
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            } else {
            console.log("There was a problem with the request.");
            }
        }
    }
    catch(e){console.err(e.message)}
}

export {MakeRequest}