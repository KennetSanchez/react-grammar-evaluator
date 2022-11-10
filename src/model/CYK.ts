import { Grammar } from "./Grammar";

let globalMatrix : string[][][];
let grammar : Grammar;
let word : string;

/**Function that takes a Free of Context Grammar in Normal Chomsky Form, and a word, and asseses 
 * whether said word can be generated with the given grammar. */
const cyk = (g: Grammar, w: string): boolean => {
    let isGenerated : boolean = false;
    
    grammar = g; // These are pointers
    word = w;

    let length : number = word.length;
    globalMatrix = spawnMatrix(length);    
    firstCycle();
    cyk_algorithm(length);    
    if (globalMatrix[length - 1][0].includes('S')) isGenerated = true;
    return isGenerated;
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

const cyk_algorithm = (n : number) => {
    for (let j = 2; j <= n; j++) {
        for (let i = 1; i <= n - j + 1; i++) {
            let XijLeadsTo : string[] = []; // Initialize the set of rules Xij generates
            let Xij : string[] = [];

            for (let k = 1; k < j; k++) {
                
                let Xik : string[] = globalMatrix[k - 1][i- 1];
                let iPlusK : number = i + k;
                let jMinusK : number = j - k;                
                let Xikjk : string[] = globalMatrix[jMinusK - 1][iPlusK - 1];
                
                let contentXij : string[] = concat(Xik, Xikjk);

                for (let c = 0; c < contentXij.length; c++) {
                    let con :string = contentXij[c];
                    if (!XijLeadsTo.includes(con)) {
                        XijLeadsTo.push(con);
                        grammar.toElementfromVar(con).forEach(e => {
                            if (!Xij.includes(e)) Xij.push(e);
                        })
                    }
                }
            }
            
            globalMatrix[j- 1][i- 1] = Xij.slice();
        }
    }
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