import { useState } from 'react'
import classes from './Input.module.css'

export default function Input(props) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={classes.control + (isFocused ? ' ' + classes.focused : '')}>
            <input
                {...props}
                onFocus={() => {setIsFocused(true)}}
                onBlur={() => {setIsFocused(false)}}
            />
            <span>{props.placeholder}</span>
        </div>
    )
}
