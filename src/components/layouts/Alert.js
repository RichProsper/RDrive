import classes from './Alert.module.css'

export default function Alert({ message, setErr }) {
    return (
        <div className={classes.Alert}>
            <div className={classes.body}><b>Error:</b> {message}</div>
            <button type="button" className={classes.close} onClick={() => setErr('')}>
                &times;
            </button>
        </div>
    )
}
