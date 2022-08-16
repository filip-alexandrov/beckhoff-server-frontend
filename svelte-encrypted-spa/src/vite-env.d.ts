/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="./lib/tame.d.ts" />

import type { TAME } from './old-components/lib/tame.d.ts'

declare global {
    var TAME: any
    var temperature: {
        'Temperature #1': Array<number>
        'Temperature #2': Array<number>
        'Temperature #3': Array<number>
        'Temperature #4': Array<number>
        'Temperature #5': Array<number>
        'Temperature #6': Array<number>
        'Temperature #7': Array<number>
        'Temperature #8': Array<number>
    }
    var baumer: {
        'Baumer #1': Array<number>
        'Baumer #2': Array<number>
        'Baumer #3': Array<number>
        'Baumer #4': Array<number>
    }
    var hbm: {
        'HBM #1': Array<number>
    }
    var idl: {
        'IDL #2': Array<number>
        'IDL #3': Array<number>
        'IDL #4': Array<number>
        'IDL #5': Array<number>
        'IDL #6': Array<number>
    }
    var orientus: {
        'Orientus #1': Array<number>
    }
}

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onclick_outside: () => void
    }
}

/* interface Window {
    TAME: any
} */
