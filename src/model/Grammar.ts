const VARS_TO_SEPARATOR : string = "-->"
const VAR_SEPARATOR : string = "|";
const TERMINAL_INDICATOR : string = "\\";
const STARTING_VAR_NAME : string = "S";

/** An implementation of a Context Free Grammar (CFG) given in Chomsky Normal Form.
 * 
 * @property {string[]} _indexer An array 
*/
export default class Grammar {   

    private _indexer : string[];
    private _variables : string[][];

    constructor(vars : string[]) {
        this._indexer = [STARTING_VAR_NAME]; //Initialize indexer with size 1 with empty at 0
        this._variables = [[]]; //Initialize variables with size 1 with empty array at 0
        this.fillGrammar(vars);
    }

    public getVarsToSeparator() : string {
        return VARS_TO_SEPARATOR;
    }

    public getVarSeparator() : string {
        return VAR_SEPARATOR
    }

    public getTerminalIndicator() : string {
        return TERMINAL_INDICATOR;
    }

    /**
     * Returns an object containing the variables and terminals that can be reached directly from the provided variable. 
     * If the variable does not exist, returns an object with two empty string arrays instead
     * 
     * @param A The variable from which the variables or terminals are reached. 
     * @returns An object containing a string array `V` with the variables that can be reached from variable `A`, and a string array `T` containing the terminals that can be reached from it as well
    */
    public varALeadsToVarsVAndTerminalsT(A : string) : {V: string[], T: string[]} {
        let V : string[] = []; //Variables you can get to from var A
        let T : string[] = []; //Terminals you can get to from var A
        let index : number = this._indexer.findIndex(v => v === A); //Index of var A in the indexer

        if (index === -1) return {V, T}; //A is not an indexed variable name

        let varsAndTerminals = this._variables[index] // !!!BY REFERENCE!!!
        varsAndTerminals.forEach(element => {
            if (element[0] === TERMINAL_INDICATOR) T.push(element) //Element is a terminal, push to Terminals
            else V.push(element); //Element was a variable pair, push to Variables
        });

        return {V, T};
    }

    private fillGrammar (vars: string[]) {

        let startInjected : boolean = false; //Flag to assure starting rule "S" is at position 0
    
        vars.forEach(rule => {
    
            //rule --> "A -> BC | \a | ..."
    
            let resultingSplit : string[] = rule.split(VARS_TO_SEPARATOR) // ["A ", "BC | \a | ..."]
            let cond : string = resultingSplit[0].trim(); // "A"
            let res : string = resultingSplit[1]; // "BC | \a | ..."
            let toVarsAndTerminals : string[] = res.split(VAR_SEPARATOR).map(x => x.trim()); // ["BC", "\a", ...]
            
            if (!startInjected && cond === STARTING_VAR_NAME) {
                this._variables[0] = toVarsAndTerminals; //Replace empty array in variables with corresponding variables for rule "S"
                startInjected = !startInjected;
            }

            this._indexer.push(cond); //Push condition to indexer, in order of appereance unless cond is "S"
            this._variables.push(toVarsAndTerminals); //Push result of contidion to variables, in order of appereance unless cond is "S"
        });
    
    }
}

