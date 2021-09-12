import classes from './Layout.module.css'
import PublicNav from './PublicNav'

export default function Layout({ children }) {
    return (
        <>
            <PublicNav />
            <div className={classes.Layout}>
                {children}
            </div>
        </>
    )
}
