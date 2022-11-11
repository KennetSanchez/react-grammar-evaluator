
export const Row = (
    props : {
        id? : string,
        iterNum? : number,
        placeHolder? : string,
        onEnter : () => any
    }) => 
    {

        const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                props.onEnter();
            }
        }

        return(
            <section className="table__columns__input"> 
                <input id={props.id} autoFocus className = {`table__columns__input${props.iterNum}`} placeholder={props.placeHolder} type = "text" onKeyDown={_handleKeyDown} ></input>
            </section>
        );
}