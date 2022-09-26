import classes from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <section className={classes.Landing}>
            <div className={classes.banner}></div>
            <div className={classes.main}>
                <span className={classes.logo}>RDrive</span>
                <span className={classes.pitch}>
                    <span className={classes.gradient}>Upload</span> your folders and files.
                    <br /><span className={classes.gradient}>Store</span> them forever.
                    <br /><span className={classes.gradient}>Access</span> them anytime, anyhwere, on any device.
                </span>
                <div className={classes.cta}>
                    <Link to="/signup" className={classes.link}>Sign Up</Link>
                    <Link to="/signin" className={classes.link}>Sign In</Link>
                </div>
            </div>
            <footer className={classes.attribution}>
                Photo by <strong><a target="blank_" rel="noopener" href="https://www.pexels.com/@olly/">Andrea Piacquadio</a></strong> from <strong><a target="blank_" rel="noopener" href="https://www.pexels.com/photo/pondering-female-secretary-picking-folder-in-workplace-3791242/">Pexels</a></strong>
            </footer>
        </section>
    )
}