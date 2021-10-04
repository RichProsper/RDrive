import classes from './File.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

export default function File({ file }) {
    const dArr = new Date(file.modifiedAt.toDate()).toDateString().split(' ')
    const d = dArr[2] + ' ' + dArr[1] + ' ' + dArr[3]
    
    return (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.File}
        >
            <span className={classes['w-60']}>
                <FontAwesomeIcon icon={faFile} /> {file.name}
            </span>
            <span className={classes['w-20']}>{d}</span>
            <span className={classes['w-20']}>-</span>
        </a>
    )
}
