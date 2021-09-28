import classes from './PrivateNav.module.css'
import { Link } from 'react-router-dom'
import useAuthCtx from '../../contexts/AuthContext'
import LoadingOverlay from '../layouts/LoadingOverlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function PrivateNav() {
    const { signout, isLoading, currentUser } = useAuthCtx()

    return (
        <header className={classes.PrivateNav}>
            <Link to="/" className={classes.logo}>RDrive</Link>
            <span tabIndex="0" className={classes.user}>
                <FontAwesomeIcon icon={faUser} />

                <div className={classes.dropdown}>
                    <div>{currentUser.email}</div>
                    <button type="button" onClick={signout}>Sign Out</button>
                </div>
            </span>

            {isLoading && <LoadingOverlay />}
        </header>
    )
}
