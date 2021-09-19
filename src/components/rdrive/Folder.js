import { Link } from 'react-router-dom'
import classes from './Folder.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

export default function Folder({ folder }) {
    return (
        <Link
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder }
            }}
            className={classes.Folder}
        >
            <FontAwesomeIcon icon={faFolder} /> {folder.name}
        </Link>
    )
}
