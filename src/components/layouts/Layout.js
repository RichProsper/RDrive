import classes from './Layout.module.css'
import PublicNav from './PublicNav'

export default function Layout({ children }) {
    return (
        <section className={classes.Layout}>
            <PublicNav />
            <main className={classes.main}>
                {children}
            </main>
        </section>
    )
}