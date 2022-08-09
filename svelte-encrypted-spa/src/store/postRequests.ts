export async function writeStartTest(
    e_OperationMode,
    rMinCurrent,
    rMaxCurrent,
    rCurrentStep,
    rMinAirgap,
    rMaxAirgap,
    rAirgapStep,
    bStartButton,
    bEmergencyStop,
    sCSVName,
    tWaitBeforeMeasurement,
    bPause,
) {
    const tcRes = await fetch('/api/writeStartTest', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            e_OperationMode,
            rMinCurrent,
            rMaxCurrent,
            rCurrentStep,
            rMinAirgap,
            rMaxAirgap,
            rAirgapStep,
            bStartButton,
            bEmergencyStop,
            sCSVName,
            tWaitBeforeMeasurement,
            bPause,
        }),
    })

    return tcRes
}

export async function connectToPlc() {
    const tcRes = await fetch('/api/connectToPlc', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return tcRes
}
