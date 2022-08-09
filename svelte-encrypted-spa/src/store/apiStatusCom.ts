import { writable } from 'svelte/store'
import { getPlcStatus } from './requests'
import { allPlcVariables } from './apiReadingCom'

export const plcConnectionStatus = writable({
    success: false,
    error: 'Connection not initialized',
})

async function startCheckingPlcStatus(){
    console.log("Checking PLC status...")

    setInterval(async () => {
        let plcStatus = await getPlcStatus()

        if (plcStatus.success == false) {
            plcConnectionStatus.set({
                success: false,
                error: plcStatus.errorMessage,
            })
        } else {
            plcConnectionStatus.set({
                success: true,
                error: '',
            })
        }
    } , 500)
}

startCheckingPlcStatus();