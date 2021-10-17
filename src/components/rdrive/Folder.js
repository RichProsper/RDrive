import { Link } from 'react-router-dom'
import classes from './Folder.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { ITEM_TYPES } from './contextmenu/ContextMenu'

export default function Folder({ folder }) {
    const dArr = folder.createdAt ? new Date(folder.createdAt).toDateString().split(' ') : null
    const d = dArr ? dArr[2] + ' ' + dArr[1] + ' ' + dArr[3] : ''

    return (
        <Link
            to={`/folder/${folder.id}`}
            className={classes.Folder}
            data-ctx-menu-opener
            data-type={ITEM_TYPES.FOLDER}
            data-name={folder.name}
            data-created-at={folder.createdAt}
        >
            <span className={classes['w-60']}>
                <FontAwesomeIcon icon={faFolder} /> {folder.name}
            </span>
            <span className={classes['w-20']}>{d}</span>
            <span className={classes['w-20']}>-</span>
        </Link>
    )
}
