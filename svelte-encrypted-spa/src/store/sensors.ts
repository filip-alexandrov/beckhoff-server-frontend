import { writable } from 'svelte/store'

export const opModes = [
    "A1", 
    "A2"
]

export const temperatureSensors = [
    'Temperature #1',
    'Temperature #2',
    'Temperature #3',
    'Temperature #4',
    'Temperature #5',
    'Temperature #6',
    'Virtual Temperature',
]
export const weightSensors = [
    'Small Force #1',
    'Small Force #2',
    'Small Force #3',
    'Small Force #4',
    'Big Force',
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

export const sensorUnits = writable({
    'Temperature #1': "°C",
    'Temperature #2': "°C",
    'Temperature #3': "°C",
    'Temperature #4': "°C",
    'Temperature #5': "°C",
    'Temperature #6': "°C",
    'Virtual Temperature': "°C",

    'Small Force #1': "N",
    'Small Force #2': "N",
    'Small Force #3': "N",
    'Small Force #4': "N",
    'Big Force': "N",

    'IDL #1': "mm",
    'IDL #2': "mm",
    'IDL #3': "mm",
    'IDL #4': "mm",
    'IDL #5': "mm",
    'IDL #6': "mm",

    Current: "A",
    Voltage: "V",
    'Motor Velocity': "mm/s",
    'Motor Position': "mm",
})

export const fullSensorData = writable({
    'Temperature #1': "0",
    'Temperature #2': "0",
    'Temperature #3': "0",
    'Temperature #4': "0",
    'Temperature #5': "0",
    'Temperature #6': "0",
    'Virtual Temperature': "0",

    'Small Force #1': "0",
    'Small Force #2': "0",
    'Small Force #3': "0",
    'Small Force #4': "0",
    'Big Force': "0",

    'IDL #1': "0",
    'IDL #2': "0",
    'IDL #3': "0",
    'IDL #4': "0",
    'IDL #5': "0",
    'IDL #6': "0",

    Current: "0",
    Voltage: "0",
    'Motor Velocity': "0",
    'Motor Position': "0",
})

export const otherSensorMappings = {
    Current: "GVL_OutputHMI.rCurrentLive",
    Voltage: "GVL_OutputHMI.rVoltageLive",
    'Motor Velocity': "GVL_OutputHMI.rMotorVelocity",
    'Motor Position': "GVL_OutputHMI.rMotorPosition",
    'Big Force': "GVL_OutputHMI.ST_SensorOutputs.rBigForceLive",
    'Small Force #1': "GVL_OutputHMI.ST_SensorOutputs.rSmallForceLive[0]",
    'Small Force #2': "GVL_OutputHMI.ST_SensorOutputs.rSmallForceLive[1]",
    'Small Force #3': "GVL_OutputHMI.ST_SensorOutputs.rSmallForceLive[2]",
    'Small Force #4': "GVL_OutputHMI.ST_SensorOutputs.rSmallForceLive[3]",
}

export async function continousSensorUpdate(allValues) {
    fullSensorData.update((data) => {
        data['Temperature #1'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][0]).toFixed(1)
        data['Temperature #2'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][1]).toFixed(1)
        data['Temperature #3'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][2]).toFixed(1)
        data['Temperature #4'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][3]).toFixed(1)
        data['Temperature #5'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][4]).toFixed(1)
        data['Temperature #6'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rTemperatureLive"][5]).toFixed(1)
        data['Virtual Temperature'] = (allValues["GVL_OutputHMI.rVirtualTemperature"]).toFixed(1)

        data['Small Force #1'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rSmallForceLive"][0]).toFixed(1)
        data['Small Force #2'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rSmallForceLive"][1]).toFixed(1)
        data['Small Force #3'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rSmallForceLive"][2]).toFixed(1)
        data['Small Force #4'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rSmallForceLive"][3]).toFixed(1)
        data['Big Force'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rBigForceLive"]).toFixed(1)

        data['IDL #1'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][0]).toFixed(1)
        data['IDL #2'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][1]).toFixed(1)
        data['IDL #3'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][2]).toFixed(1)
        data['IDL #4'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][3]).toFixed(1)
        data['IDL #5'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][4]).toFixed(1)
        data['IDL #6'] = (allValues["GVL_OutputHMI.ST_SensorOutputs"]["rDistanceLive"][5]).toFixed(1)

        data['Current'] = (allValues["GVL_OutputHMI.rCurrentLive"]).toFixed(1)
        data['Voltage'] = (allValues["GVL_OutputHMI.rVoltageLive"]).toFixed(1)

        data['Motor Velocity'] = (allValues["GVL_OutputHMI.rMotorVelocity"] / 1000).toFixed(2)
        data['Motor Position'] = (allValues["GVL_OutputHMI.rMotorPosition"]).toFixed(1)

        return data
    })
}
