import { cyk } from './model/CYK';
import { InputTable } from './components/input_table';
import {Grammar, VARS_TO_SEPARATOR, VAR_SEPARATOR } from './model/Grammar';
import "./scss/3-layout/_appLayout.scss";


function App() {

  let grammarTest : string[] = 
  [
    `S ${VARS_TO_SEPARATOR} BA ${VAR_SEPARATOR} AB`,
    `A ${VARS_TO_SEPARATOR} CA ${VAR_SEPARATOR} a`,
    `B ${VARS_TO_SEPARATOR} BB ${VAR_SEPARATOR} b`,
    `C ${VARS_TO_SEPARATOR} BA ${VAR_SEPARATOR} c`
  ];

  let G1 : Grammar = new Grammar(grammarTest);
  let w1 : string = "bca";

  console.log(G1.toString());
  
  console.log(cyk(G1, w1));

  return (
    <div className="App">
      <InputTable id='inputTable' columnNames={["Gramatica"]}/>
    </div>
  );
}

export default App;
