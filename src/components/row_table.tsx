
export const Row = (
    props : {
        iterNum? : number,
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
                <input autoFocus className = {`table__columns__input${props.iterNum}`} type = "text" onKeyDown={_handleKeyDown} ></input>
            </section>
        );
}