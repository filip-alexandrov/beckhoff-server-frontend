import { writable } from 'svelte/store'

// Generate example array of floats of length 20 and 2 digit precision
const generateData = () => {
    setInterval(() => {
        for (let i = 1; i <= 8; i++) {
            temperature.update((last) => {
                return {
                    ...last,
                    [`Temperature #${i}`]: last[`Temperature #${i}`].push(
                        Math.random().toFixed(2),
                    ),
                }
            })
        }
    }, 750)
}

export const temperature = writable({
    'Temperature #1': [0],
    'Temperature #2': [0],
    'Temperature #3': [0],
    'Temperature #4': [0],
    'Temperature #5': [0],
    'Temperature #6': [0],
    'Temperature #7': [0],
    'Temperature #8': [0],
})
export const baumer = writable({
    'Baumer #1': [0],
    'Baumer #2': [0],
    'Baumer #3': [0],
    'Baumer #4': [0],
})
export const hbm = writable({
    'HBM #1': [0],
})
export const idl = writable({
    'IDL #1': [0],
    'IDL #2': [0],
    'IDL #3': [0],
    'IDL #4': [0],
    'IDL #5': [0],
    'IDL #6': [0],
})
export const orientus = writable({
    'Orientus #1': [0],
})
