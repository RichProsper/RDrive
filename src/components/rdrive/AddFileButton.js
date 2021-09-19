import classes from './AddFileButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { ROOT_FOLDER } from '../hooks/useFolder'
// import useAuthCtx from '../../contexts/AuthContext'

export default function AddFileButton({ currentFolder }) {
    // const { currentUser } = useAuthCtx()

    /**
     * @param {InputEvent} e 
     */
    const uploadFile = e => {
        const file = e.target.files[0]
        if (file) {
            const filePath = currentFolder.path.length > 0 ? 
                `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}` :
                (
                    currentFolder !== ROOT_FOLDER ? `Root/${currentFolder.name}/${file.name}` : `Root/${file.name}`
                )
            console.log(filePath)
        }
    }

    return (
        <>
            <label className={classes.AddFile} title='Add New File'>
                <FontAwesomeIcon icon={faFileUpload} />
                <input type="file" onChange={uploadFile} />
            </label>
        </>
    )
}
