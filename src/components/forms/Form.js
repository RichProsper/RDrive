import classes from './Form.module.css'

export default function Form({ children, id, onSubmit }) {
    return (
        <form id={id} onSubmit={onSubmit} className={classes.Form}>
            {children}
        </form>
    )
}
