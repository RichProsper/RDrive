import classes from './Layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={classes.Layout}>
            {children}
        </div>
    )
}
