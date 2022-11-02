import React from 'react'
import { Row } from './row_table'


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

    

    let hc = 0;
    return (
        <section>
            <section id="rowButtons">
                <button onClick={addRow}>Añadir fila</button>
                <button onClick={removeRow}>Añadir fila</button>

            </section>
            
            <div className= {"table"}>
                <div className={"table__columns"}>
                    <section className={"table__columns__header"}>
                        <h4 className={`table__columns__header${hc=hc+1}`}></h4>
                    </section>
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
