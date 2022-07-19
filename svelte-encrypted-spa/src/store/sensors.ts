import { writable } from "svelte/store";

// Generate example array of floats of length 20 and 2 digit precision
const generateData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random().toFixed(2));
    }
    return data;
}



export const temperature = writable({
    "Temperature #1": generateData(), 
    "Temperature #2": generateData(),
    "Temperature #3": generateData(),
    "Temperature #4": generateData(),
    "Temperature #5": generateData(),
    "Temperature #6": generateData(),
    "Temperature #7": generateData(),
    "Temperature #8": generateData(),
});
export const baumer = writable({
    "Baumer #1": generateData(),
    "Baumer #2": generateData(),
    "Baumer #3": generateData(),
    "Baumer #4": generateData(),
});
export const hbm = writable({
    "HBM #1": generateData(),
});
export const idl = writable({
    "IDL #1": generateData(),
    "IDL #2": generateData(),
    "IDL #3": generateData(),
    "IDL #4": generateData(),
    "IDL #5": generateData(),
    "IDL #6": generateData(),
});
export const orientus = writable({
    "Orientus #1": generateData(),
});