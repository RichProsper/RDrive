import classes from './File.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

export default function File({ file }) {
    const dArr = file.modifiedAt ? new Date(file.modifiedAt.toDate()).toDateString().split(' ') : null
    const d = dArr ? dArr[2] + ' ' + dArr[1] + ' ' + dArr[3] : ''

    const formatSize = size => {
        if (!size) return ''
        if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`
        if (size >= 100 * 1024) return `${(size / 1024).toFixed(0)} KB`
        if (size >= 10 * 1024) return `${(size / 1024).toFixed(1)} KB`
        if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`
        return `${size} bytes`
    }

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
            <span className={classes['w-20']}>{formatSize(file.size)}</span>
        </a>
    )
}
