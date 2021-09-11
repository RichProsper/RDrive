import classes from './SubmitButton.module.css'

export default function SubmitButton({ text }) {
    return (
        <div className={classes.action}>
            <button type="submit">{text}</button>
        </div>
    )
}
