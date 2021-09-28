import classes from './AddFileButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { addDoc, query, where, getDocs, updateDoc } from '@firebase/firestore'
import firestoreDb, { storage } from '../../firebase'
import useAuthCtx from '../../contexts/AuthContext'
import Toast from '../layouts/Toast'
import { useState, useRef } from 'react'

export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuthCtx()
    const [isUploading, setIsUploading] = useState(false)
    const [fileName, setFileName] = useState('')
    const [progress, setProgress] = useState(0)
    const fileInput = useRef()

    /**
     * @param {KeyboardEvent} e 
     */
    const openFileInput = e => {
        fileInput.current.click()
    }

    /**
     * @param {InputEvent} e 
     */
    const uploadFile = e => {
        const file = e.target.files[0]

        if (!file) return

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

        setFileName(file.name)
        const uploadTask = uploadBytesResumable(ref(storage, filePath), file)

        uploadTask.on('state_changed', snapshot => {
            setProgress( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 )

            if (snapshot.bytesTransferred === snapshot.totalBytes) {
                setTimeout(() => {
                    setIsUploading(false)
                    setFileName('')
                }, 1000);
            }
            else if (!isUploading) {
                setIsUploading(true)
            }
        },
        e => console.log(e),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                const q = query(
                    firestoreDb.files,
                    where('userId', '==', currentUser.uid),
                    where("name", "==", file.name),
                    where("folderId", "==", currentFolder.id)
                )

                getDocs(q).then(snapshot => {
                    const existingFile = snapshot.docs[0]

                    if (existingFile) {
                        updateDoc(existingFile.ref, {
                            url,
                            modifiedAt: firestoreDb.getTimestamp()
                        })
                    }
                    else {
                        addDoc(firestoreDb.files, {
                            name: file.name,
                            url,
                            createdAt: firestoreDb.getTimestamp(),
                            modifiedAt: firestoreDb.getTimestamp(),
                            folderId: currentFolder.id,
                            userId: currentUser.uid
                        }).catch(e => console.log(e))        
                    }
                })
            })
        })
    }

    return (
        <>
            <label
                tabIndex="0"
                className={classes.AddFile}
                title='Add New File'
                onKeyPress={openFileInput}
            >
                <FontAwesomeIcon icon={faFileUpload} />
                <input ref={fileInput} type="file" onChange={uploadFile} />
            </label>

            {isUploading && <Toast fileName={fileName} progress={progress} />}
        </>
    )
}
