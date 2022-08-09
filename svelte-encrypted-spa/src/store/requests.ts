export async function connectToPlc() {
    const tcRes = await fetch('http://localhost:6328/api/connectToPlc', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return tcRes.json()
}

export async function disconnectPlc() {
    const tcRes = await fetch('http://localhost:6328/api/disconnectPlc', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return tcRes.json()
}

export async function getPlcStatus() {
    const tcRes = await fetch('http://localhost:6328/api/getPlcStatus', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return tcRes.json()
}

export async function readAllValues() {
    const tcRes = await fetch('http://localhost:6328/api', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return tcRes.json()
}

export async function writeValues(writeObj) {
    const tcRes = await fetch('http://localhost:6328/api', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(writeObj),
    })

    return tcRes.json()
}
