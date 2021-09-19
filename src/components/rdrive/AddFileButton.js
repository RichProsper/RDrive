import classes from './AddFileButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { addDoc } from '@firebase/firestore'
import firestoreDb, { storage } from '../../firebase'
import useAuthCtx from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'

export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuthCtx()
    const [progress, setProgress] = useState(-1)

    useEffect(() => {
        if (progress > -1) console.log(progress)
    }, [progress])

    /**
     * @param {InputEvent} e 
     */
    const uploadFile = e => {
        const file = e.target.files[0]
        if (file) {
            let filePath = `/files/${currentUser.uid}/`

            if (currentFolder.path.length > 0) {
                currentFolder.path.forEach(folder => filePath += `${folder.name}/`)
                filePath += `${currentFolder.name}/${file.name}`
            }
            else if (currentFolder !== ROOT_FOLDER) {
                filePath += `${currentFolder.name}/${file.name}`
            }
            else {
                filePath += file.name
            }

            const uploadTask = uploadBytesResumable(ref(storage, filePath), file)

            uploadTask.on('state_changed', snapshot => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(uploadProgress)
            }, e => console.log(e), () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    addDoc(firestoreDb.files, {
                        name: file.name,
                        url,
                        createdAt: firestoreDb.getTimestamp(),
                        folderId: currentFolder.id,
                        userId: currentUser.uid
                    }).catch(e => console.log(e))
                })
            })
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
