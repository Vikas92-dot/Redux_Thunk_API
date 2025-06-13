export const Input =(props) =>{
    return<>
        <input 
            name={props.name} 
            value={props.value} 
            label={props.label}
            onChange={props.onChange}
            onBlur={props.onBlur} 
            className={props.className} 
            type={props.type} 
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            readOnly={props.readOnly}
            required={props.required}
            style={props.style}
            />
    </>
}