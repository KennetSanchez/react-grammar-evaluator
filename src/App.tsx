import React from 'react';
import {Grammar, VARS_TO_SEPARATOR, VAR_SEPARATOR, TERMINAL_INDICATOR } from './model/Grammar';

function App() {

  let grammarTest : string[] = 
  [
    `S ${VARS_TO_SEPARATOR} BA ${VAR_SEPARATOR} AB`,
    `A ${VARS_TO_SEPARATOR} CA ${VAR_SEPARATOR} ${TERMINAL_INDICATOR}a`,
    `B ${VARS_TO_SEPARATOR} BB ${VAR_SEPARATOR} ${TERMINAL_INDICATOR}b`,
    `C ${VARS_TO_SEPARATOR} BA ${VAR_SEPARATOR} ${TERMINAL_INDICATOR}c`
  ];

  let G1 : Grammar = new Grammar(grammarTest);
  let w1 : string = "bca";
  

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
