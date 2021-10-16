import classes from './ButtonGroup.module.css'

export default function ButtonGroup({ children }) {
    return (
        <div className={classes.ButtonGroup}>
            {children}
        </div>
    )
}
