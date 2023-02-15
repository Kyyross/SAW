//AJAX Approach

var httpRequest;

const MakeRequest=(URL,METHOD,REQUEST)=>{
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) { throw new Error("on making the request to the server").catch((e)=>{console.err(e.message);});}
    httpRequest.onreadystatechange = CheckStateResponse; //METHOD=="GET"?CheckStateResponse;
    httpRequest.open(METHOD, URL); //"GET/POST", "test.html"
    if(METHOD=="POST"){
        httpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
        );
    }
    httpRequest.send(URL); //miss case REQUEST POST
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