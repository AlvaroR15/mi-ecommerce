export const BoxInput = (props) => {
    return (
        <div>
            <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
        </div>
    )
}