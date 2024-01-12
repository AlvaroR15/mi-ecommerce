export const Inputs = (props) => {
    return (
        <div>
            <label htmlFor={props.for}>{props.for}</label>
            <input name={props.name} type={props.type} placeholder={props.placeholder} required />

        </div>
    )
}