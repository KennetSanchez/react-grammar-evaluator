import React from 'react'
import { Row } from './row_table'
import "./../scss/4-components/_table.scss";

export const InputTable = (
    props : {
        columnNames : string [],
        id: string
    }, 

)=>{

    const [rows, setRows] = React.useState([<Row/>])

    function addRow():void{
        setRows(rows.concat(<Row/>))
    }

    function removeRow():void{
        setRows(rows.slice(0,-1))
    }

    return (
        <section>
            <section id="rowButtons">
                <button id = "addRowBtn" onClick={addRow}>Añadir fila</button>
                <button id = "removeRowBtn" onClick={removeRow}>Remover fila</button>
            </section>
            
            <div className= {"table"}>
                <div className={"table__columns"}>
                        <h1 className={`table__columns__header`}>{props.columnNames[0]}</h1>
                    <section id = {props.id}>
                    {rows.map(()=>{
                            return(
                            <Row/>
                            )                     
                        })}

                    </section>
                </div>
            </div>

        </section>
    );
}
