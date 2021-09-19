import classes from './FolderPath.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function FolderPath({ currentFolder }) {
    const [path, setPath] = useState([])

    useEffect(() => {
        if (currentFolder !== null) {
            currentFolder === ROOT_FOLDER ? 
                setPath([ROOT_FOLDER]) : 
                setPath([
                    ROOT_FOLDER,
                    ...currentFolder.path,
                    { id: currentFolder.id, name: currentFolder.name }
                ])
        }
    }, [currentFolder])

    return (
        <div className={classes.FolderPath}>
            {path.map((folder, index) => (
                <div key={index} id={index} className={classes.item}>
                    <Link
                        to={{
                            pathname: folder.id ? `/folder/${folder.id}` : '/',
                            state: { folder: { ...folder, path: path.slice(1, index) } }
                        }}
                        className={classes.foldername}
                        title={folder.name}
                    >
                        {folder.name}
                    </Link>
                    <div className={classes.chevron}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            ))}
        </div>
    )
}
