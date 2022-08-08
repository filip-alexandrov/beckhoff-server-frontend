"use strict";
var Service = require('node-windows').Service;
// Create a new service object
var svc = new Service({
    name: 'index.js express server',
    description: 'Server running on port 80',
    script: 'C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\server\\build\\index.js',
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
