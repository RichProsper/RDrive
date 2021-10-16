import classes from './Button.module.css'

export default function Button({ type, className, onClick, children }) {
    return (
        <button
            type={type}
            className={`${classes.Button} ${classes[className]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
