import classes from './File.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

export default function File({ file }) {
    return (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.File}
        >
            <FontAwesomeIcon icon={faFile} /> {file.name}
        </a>
    )
}
