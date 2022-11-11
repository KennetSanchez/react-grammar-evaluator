import React from 'react'
import { Row } from './row_table'
import "./../scss/4-components/_table.scss";
import { cyk } from '../model/CYK';
import { Grammar } from '../model/Grammar';

export const InputTable = (
    props : {
        columnNames : string [],
        id: string
    }, 

)=>{

    let count : number = 0;
    const [rows, setRows] = React.useState([<Row id={`table__columns__input${count}`} iterNum={count} onEnter={addRow}/>]);

    function addRow():void{
        count++;
        setRows(rows.concat(<Row id={`table__columns__input${count}`} iterNum={count} onEnter={addRow}/>));
    }

    function removeRow():void{
        setRows(rows.slice(0,-1))
    }

    const runCyk = () => {
        let vars : string[]= [];
        let w : string = (document.getElementById("string_input") as HTMLInputElement).value
        for (let i = 1; i <= rows.length; i++) {
            let lookupId : string = `table__columns__input${i}`;
            let content : string = (document.getElementById(lookupId) as HTMLInputElement).value;
            vars.push(content);
        }

        let grammar : Grammar = new Grammar(vars);
        let grammarGenerates : boolean =  cyk(grammar, w);

        let result = document.getElementById("result_cyk") as HTMLElement;
        result.innerHTML = grammarGenerates ? `La cadena ${w} es generada por la gramática.` : `La cadena ${w} NO es generada por la gramática.` ;
        
    }

    return (
        <section>
            <section id="rowButtons">
                <button className={"utility"} id = "removeRowBtn" onClick={removeRow}>-</button>
                <button id = "runBtn" onClick={runCyk}>¡Probar!</button>
                <button className={"utility"} id = "addRowBtn" onClick={addRow}>+</button>
            </section>

            <section className="table result">
                <h3 id={"result_cyk"}>Esperando entrada para calcular resultado...</h3>
            </section>
            
            <div className= {"table"}>
                <div className={"table__columns"}>
                        <h1 className={`table__columns__header`}>{props.columnNames[0]}</h1>
                        <section id = {props.id}>
                        {rows.map(()=>{
                                return(
                                <Row id={`table__columns__input${count + 1}`} iterNum={++count} placeHolder={"S --> AB | CD | a | ..."} onEnter={addRow}/>
                                )                     
                            })}

                        </section>
                </div>

                <div className="tested__string">
                <div className={"table__columns"}>
                    <h1 className={"table__columns__header"}>Prueba</h1>
                    <Row id="string_input" onEnter={runCyk} placeHolder={"Ingrese una cadena..."}/>
                </div>
                </div>
            </div>


        </section>
    );
}
