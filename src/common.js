 
function createXHR(){

    if (typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined"){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"],
                i, len;
    
            for (i=0,len=versions.length; i < len; i++){
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex){
                    //skip
                    console.log(ex);
                }
            }
        }
    
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}


function makeRequest(url, type, data){

    var promise = new RSVP.Promise(function(resolve, reject){
        var xhr = createXHR();

        xhr.onreadystatechange = handler;

        xhr.open(type, url, true);
        /*xhr.setRequestHeader('Accept','application/json');*/
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");

        (data) ? xhr.send("data=" + JSON.stringify(data)) : xhr.send(null); 

        function handler(){
            if(this.readyState == 4){
                if((this.status >= 200 && this.status < 300) || this.status == 304){
                    resolve(this.response);
                }else{
                    reject(this);
                }
            }
        }
    });

    return promise;    
}





/*function serialize(data){

    var stringData ="";

    for( var i in data){

        stringData += i + "=" + data[i] + "&";
    }   
    return stringData;
}*/