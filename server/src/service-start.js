"use strict";
var Service = require('node-windows').Service;
const path = require("path");

// Create a new service object
var svc = new Service({
    name: 'LevitationControlServer',
    description: 'Server running on port 80',
    script: path.join(__dirname, "index.js"),
    wait: 1, 
    maxRestarts: 10000, 
    grow: 0, 
    maxRetries: null, 
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});
svc.install();
