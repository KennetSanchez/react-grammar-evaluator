import React from 'react'
import { Row } from './row_table'
import "./../scss/4-components/_table.scss";
import { cyk } from '../model/CYK';

export const InputTable = (
    props : {
        columnNames : string [],
        id: string
    }, 

)=>{

    const [count, setCount] = React.useState(1);
    const [rows, setRows] = React.useState([<Row iterNum={count} onEnter={addRow}/>]);

    function addRow():void{
        setCount(count + 1);
        setRows(rows.concat(<Row iterNum={count} onEnter={addRow}/>));
    }

    function removeRow():void{
        setRows(rows.slice(0,-1))
    }

    const runCyk = () => {
        // cyk();
    }

    return (
        <section>
            <section id="rowButtons">
                <button id = "addRowBtn" onClick={addRow}>Añadir fila</button>
                <button id = "runBtn" onClick={runCyk}>¡Probar!</button>
                <button id = "removeRowBtn" onClick={removeRow}>Remover fila</button>
            </section>
            
            <div className= {"table"}>
                <div className={"table__columns"}>
                        <h1 className={`table__columns__header`}>{props.columnNames[0]}</h1>
                    <section id = {props.id}>
                    {rows.map(()=>{
                            return(
                            <Row onEnter={addRow}/>
                            )                     
                        })}

                    </section>
                </div>
            </div>

        </section>
    );
}
