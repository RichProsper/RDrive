import classes from './Alert.module.css'

export default function Alert({ type, message }) {
    return (
        <div className={classes[type]}>
            {message && <span>{message}</span>}
        </div>
    )
}
