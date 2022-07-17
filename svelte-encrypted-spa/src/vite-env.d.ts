/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="./lib/tame.d.ts" />

import type {TAME} from "./lib/tame.d.ts"

declare global {
    var TAME: any; 
}

interface Window {
    TAME: any;
}