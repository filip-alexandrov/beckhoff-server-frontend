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

var countUp = document.getElementById("value1");; 
var counter = document.getElementById("value2");;

function loadExample(){
    var pollValue1 = function(){
        Plc.readBool({name: "MAIN.countUp", jvar: "countUp.innerText"})

        Plc.readDint({name: "MAIN.counter", jvar: "counter.innerText"})
    }

    console.log('Poll value loaded');

    document.getElementById("button1").onclick = function(){
        var startStop = document.getElementById("startStop").checked;
        Plc.writeBool({name: "MAIN.countUp", val: !countUp, oc: pollValue1, ocd: 100});
    }

    document.getElementById("button2").onclick = function(){
        var startValue = document.getElementById('startValue').value;
        Plc.writeDint({name: "MAIN.counter", val: startValue, oc: pollValue1, ocd: 100});
    }

    console.log("Write value loaded");


    setInterval(() => {
        pollValue1(); 
    }, 100);
}

