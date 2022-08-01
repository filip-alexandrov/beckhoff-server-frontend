//Webservice definition for all examples
/* var Plc

function startClient(handles) {
    Plc = TAME.WebServiceClient.createClient({
        serviceUrl: 'http://localhost/TcAdsWebService/TcAdsWebService.dll',
        //configFileUrl: 'http:///tamex/resources/demo2.tpy',  //Path to the TPY file
        amsNetId: '192.168.248.2.1.1',
        amsPort: '851', //default
        useHandles: false, //use handles
        alignment: '8', //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
        //language: 'ge',       //default, set it to "en" for english names of days and months
        onReady: loadExample, //this function is defined in each example
    })
}

window.onload = startClient

var countUp
var counter

function loadExample() {
    console.log('Example loaded')

    var pollValue1 = function () {
        Plc.readBool({ name: 'MAIN.countUp', jvar: 'countUp' })
        
        Plc.readDint({ name: 'MAIN.counter', jvar: 'counter' })
    }

    setInterval(() => {
        pollValue1()
    }, 500)
} */

var temperature
var baumer
var hbm
var idl
var orientus

function emptySensors() {
    // Prevent overloading the browser & init the sensors
    temperature = {
        'Temperature #1': [],
        'Temperature #2': [],
        'Temperature #3': [],
        'Temperature #4': [],
        'Temperature #5': [],
        'Temperature #6': [],
        'Temperature #7': [],
        'Temperature #8': [],
    }
    baumer = {
        'Baumer #1': [],
        'Baumer #2': [],
        'Baumer #3': [],
        'Baumer #4': [],
    }
    hbm = {
        'HBM #1': [],
    }
    idl = {
        'IDL #1': [],
        'IDL #2': [],
        'IDL #3': [],
        'IDL #4': [],
        'IDL #5': [],
        'IDL #6': [],
    }
    orientus = {
        'Orientus #1': [],
    }
}

let couterCycle = 0
emptySensors()


setInterval(() => {
    // Empty memory over 10k values in the arrays; chart overload
    if (couterCycle > 10000) {
        emptySensors()
        couterCycle = 0
    } else {
        couterCycle++
    }

    for (let key in temperature) {
        temperature[key].push(Math.floor(Math.random() * 20 +80))
    }

    for (let key in baumer) {
        baumer[key].push(Math.floor(Math.random() * 20 + 50))
    }

    for (let key in hbm) {
        hbm[key].push(Math.floor(Math.random() * 20 + 20))
    }

    for (let key in idl) {
        idl[key].push(Math.floor(Math.random() * 20 -10 ))
    }

    // 250 ms faster than chart to always have a new value
}, 750)

