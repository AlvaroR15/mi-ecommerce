export const BoxInput = (props) => {
    return (
        <div>
            <label htmlFor={props.for}></label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}