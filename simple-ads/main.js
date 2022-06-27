//Webservice definition for all examples
var Plc;

function startClient(handles) {
    Plc =  TAME.WebServiceClient.createClient({
        serviceUrl: 'http://localhost/TcAdsWebService/TcAdsWebService.dll',
        //configFileUrl: 'http:///tamex/resources/demo2.tpy',  //Path to the TPY file
        amsNetId: '5.93.125.76.1.1',
        amsPort: '851',       //default
        useHandles: false,    //use handles
        alignment: '8',       //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
        //language: 'ge',       //default, set it to "en" for english names of days and months
        onReady: loadExample    //this function is defined in each example
    });
}

window.onload = startClient;

var variable1; 

function loadExample(){
    console.log('Example loaded');


    var pollValue1 = function(){
        Plc.readBool({name: "MAIN.boolean", jvar: "variable1"})
        console.log("variable1 name is: ", variable1)
    }

    setInterval(() => {
        pollValue1(); 
    }, 500);
}

