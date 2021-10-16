import classes from './Menu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'


export default function Menu({ style, openDeleteModal }) {
    return (
        <nav className={classes.Menu} style={style}>
            <ul className={classes.list} data-context-menu>
                <li>
                    <button type="button" onClick={openDeleteModal}>
                        <FontAwesomeIcon icon={faTrashAlt} className={classes.delete} /> Delete
                    </button>
                </li>
            </ul>
        </nav>
    )
}
