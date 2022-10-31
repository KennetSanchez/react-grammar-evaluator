import React from 'react';
import { cyk } from './model/CYK';
import {Grammar, VARS_TO_SEPARATOR, VAR_SEPARATOR } from './model/Grammar';

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
  
  cyk(G1, w1);
  

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
