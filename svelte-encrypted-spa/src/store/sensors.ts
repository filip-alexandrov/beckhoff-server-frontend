import { writable } from 'svelte/store'

export const temperatureSensors = [
    'Temperature #1',
    'Temperature #2',
    'Temperature #3',
    'Temperature #4',
    'Temperature #5',
    'Temperature #6',
    'Temperature #7',
    'Temperature #8',
    'Virtual Temperature',
]
export const weightSensors = [
    'Baumer #1',
    'Baumer #2',
    'Baumer #3',
    'Baumer #4',
    'HBM #1',
]

export const distanceSensors = [
    'IDL #1',
    'IDL #2',
    'IDL #3',
    'IDL #4',
    'IDL #5',
    'IDL #6',
]
export const otherSensors = [
    'Current',
    'Voltage',
    'Motor Velocity',
    'Motor Position',
]

export const fullSensorData = writable({
    'Temperature #1': 0,
    'Temperature #2': 0,
    'Temperature #3': 0,
    'Temperature #4': 0,
    'Temperature #5': 0,
    'Temperature #6': 0,
    'Temperature #7': 0,
    'Temperature #8': 0,
    'Virtual Temperature': 0,

    'Baumer #1': 0,
    'Baumer #2': 0,
    'Baumer #3': 0,
    'Baumer #4': 0,
    'HBM #1': 0,

    'IDL #1': 0,
    'IDL #2': 0,
    'IDL #3': 0,
    'IDL #4': 0,
    'IDL #5': 0,
    'IDL #6': 0,

    Current: 0,
    Voltage: 0,
    'Motor Velocity': 0,
    'Motor Position': 0,
})

setInterval(() => {
    fullSensorData.update((data) => {
        data['Temperature #1'] = Math.random() * 20 + 80
        data['Temperature #2'] = Math.random() * 20 + 80
        data['Temperature #3'] = Math.random() * 20 + 80
        data['Temperature #4'] = Math.random() * 20 + 80
        data['Temperature #5'] = Math.random() * 20 + 80
        data['Temperature #6'] = Math.random() * 20 + 80
        data['Temperature #7'] = Math.random() * 20 + 80
        data['Temperature #8'] = Math.random() * 20 + 80
        data['Virtual Temperature'] = Math.random() * 20 + 80

        data['Baumer #1'] = Math.random() * 20 + 60
        data['Baumer #2'] = Math.random() * 20 + 60
        data['Baumer #3'] = Math.random() * 20 + 60
        data['Baumer #4'] = Math.random() * 20 + 60
        data['HBM #1'] = Math.random() * 20 + 60

        data['IDL #1'] = Math.random() * 20 + 40
        data['IDL #2'] = Math.random() * 20 + 40
        data['IDL #3'] = Math.random() * 20 + 40
        data['IDL #4'] = Math.random() * 20 + 40
        data['IDL #5'] = Math.random() * 20 + 40
        data['IDL #6'] = Math.random() * 20 + 40

        data['Current'] = Math.random() * 20 + 0
        data['Voltage'] = Math.random() * 20 + 0
        data['Motor Velocity'] = Math.random() * 20 + 0
        data['Motor Position'] = Math.random() * 20 + 0

        return data
    })
}, 750)


let motorWriteRequest = {
    desiredPosition: 20, 
    velocity: 10, 
}

let newTestRequest = {
    minAirGap: 10, 
    maxAirGap: 20,
    airGapStep : 1,
    minCurrent : 10, 
    maxCurrent : 20,
    currentStep : 1,
    waitBeforeMeasurement: 2000, 
    operationMode: "A1", 
    csvFileName: 'test',
}

let testInProgressData = {
    completedSubtests: 10, 
    totalSubtests: 20,
    minAirGap: 10, 
    maxAirGap: 20,
    airGapStep : 1,
    minCurrent : 10, 
    maxCurrent : 20,
    currentStep : 1,
    waitBeforeMeasurement: 2000, 
    operationMode: "A1",
    csvFileName: 'test',
}