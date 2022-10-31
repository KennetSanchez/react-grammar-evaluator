import { Grammar } from "./Grammar";

let globalMatrix : string[][][];
let grammar : Grammar;
let word : string;

/**Function that takes a Free of Context Grammar in Normal Chomsky Form, and a word, and asseses 
 * whether said word can be generated with the given grammar. */
const cyk = (g: Grammar, w: string): boolean => {
    let isGenerated : boolean = true;
    
    grammar = g; // These are pointers
    word = w;

    let length : number = word.length;
    globalMatrix = spawnMatrix(length);    
    firstCycle();

    console.log(globalMatrix.toString());
    

    return isGenerated;
}

const firstCycle = () => {
    for (let c = 0; c < word.length; c++) {
        const element = word[c];
        let slotc0 : string[] = grammar.toElementfromVar(element);
        console.log(slotc0);
        
        globalMatrix[0][c] = slotc0;
    }
}

const spawnMatrix = (n : number) : string[][][] => {
    let matrix : string[][][] = new Array(n).fill([]);
    for (let y = 0; y < n; y++) {
        let x = n - y;
        const col = new Array<string>(x);
        matrix[y] = [col];
    }

    return matrix;
}

const jLoop = (n : number) => {
    for (let j = 0; j < n; j++) {
        iLoop(n, j);
    }
}

const iLoop = (n : number, j : number) => {
    for (let i = 0; i < n - j + 1; i++) {
        kLoop(j);
    }
}

const kLoop = (j : number) => {
    for (let k = 0; k < j - 1; k++) {
         
    }
}

export {cyk};