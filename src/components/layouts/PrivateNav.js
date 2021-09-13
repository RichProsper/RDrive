import classes from './PrivateNav.module.css'
import { Link } from 'react-router-dom'
import useAuthCtx from '../../contexts/AuthContext'
import LoadingOverlay from '../layouts/LoadingOverlay'

export default function PrivateNav() {
    const { signout, isLoading } = useAuthCtx()

    return (
        <header className={classes.PrivateNav}>
            <Link to="/" className={classes.logo}>RDrive</Link>
            <button type="button" className={classes.signout} onClick={signout}>Sign Out</button>

            {isLoading && <LoadingOverlay />}
        </header>
    )
}
