import { writable } from 'svelte/store'
import { readAllValues } from './requests'
import { continousSensorUpdate } from './sensors'

export const allPlcVariables = writable({})
export const twincatReadingError = writable('')

async function startReadingData() {
    /* let twincatStatus = await getPlcStatus()

    if (twincatStatus.success == false) {
        twincatReadingError.set(twincatStatus.errorMessage)
        return false
    } */

    let intervalId = setInterval(async () => {
        let allValues = await readAllValues()

        console.log(allValues)

        if (allValues.success == false) {
            // Raise globally accessible error
            twincatReadingError.set(allValues.errorMessage)

            return false
        }

        console.log("setting sensor values")

        // Everything functions as expected, so clear the error message
        twincatReadingError.set('')
        allPlcVariables.set(allValues)

        continousSensorUpdate(allValues)
    }, 500)

    return intervalId
}

startReadingData()