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
    jLoop(length);
    printMatrix();
    

    return isGenerated;
}

const printMatrix = () => {
    console.log(`printing matrix for string ${word}:`);
    globalMatrix.forEach(col => console.log(`J: ${col.toString()}`));
    console.log("^^printing matrix");
}

const firstCycle = () => {
    for (let c = 0; c < word.length; c++) {
        const element = word[c];
        let slotc0 : string[] = grammar.toElementfromVar(element);
        
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
    for (let j = 1; j <= n; j++) {
        iLoop(n, j);
    }
}

const iLoop = (n : number, j : number) => {
    for (let i = 1; i <= n - j + 1; i++) {
        kLoop(j + 1, i);
    }
}

const kLoop = (j : number, i : number) => {
    let XijLeadsTo : string[] = []; // Initialize the set of rules Xij generates
    let Xij : string[] = [];
    for (let k = 1; k <= j; k++) {
        let Xik : string[] = globalMatrix[k - 1][i- 1];
        let iPlusK = i + k- 1;
        let jMinusK = j - k- 1;
        let Xikjk : string[] = globalMatrix[jMinusK][iPlusK];
        
        let contentXij : string[] = concat(Xik, Xikjk);

        for (let c = 0; c < contentXij.length; c++) {
            let con :string = contentXij[c];
            if (!XijLeadsTo.includes(con)) {
                XijLeadsTo.push(con);
                Xij = grammar.toElementfromVar(con);
            }
        }
    }
    
    globalMatrix[j- 1][i- 1] = Xij;
}

const concat = (setA : string[], setB : string[]) : string[] => {
    let setC : string[] = [];

    setA.forEach(a => {
        setB.forEach(b => {
            let ab : string = a + b;
            if (!setC.includes(ab)) setC.push(ab);
        });
    });

    return setC;
}

export {cyk};