import classes from './PublicNav.module.css'
import { Link } from 'react-router-dom'

export default function PublicNav() {
    return (
        <header className={classes.PublicNav}>
            <Link to="/" className={classes.logo}>RDrive</Link>
        </header>
    )
}
