import classes from './Home.module.css'
import PrivateNav from '../components/layouts/PrivateNav'
import AddFolderButton from '../components/rdrive/AddFolderButton'
import AddFileButton from '../components/rdrive/AddFileButton'
import Folder from '../components/rdrive/Folder'
import File from '../components/rdrive/File'
import useFolder from '../components/hooks/useFolder'
import { useParams } from 'react-router'
import FolderPath from '../components/rdrive/FolderPath'
import Heading from '../components/rdrive/Heading'

export default function Home() {
    const { folderId } = useParams()
    const { folder, childFolders, childFiles } = useFolder(folderId)

    return (
        <section>
            <PrivateNav />
            <div className={classes.container}>
                <FolderPath currentFolder={folder} />
                <div className={classes.btns}>
                    <AddFolderButton currentFolder={folder} />
                    <AddFileButton currentFolder={folder} />
                </div>
            </div>

            <Heading />

            {childFolders.length > 0 && childFolders.map(childFolder => {
                return <Folder key={childFolder.id} folder={childFolder} />
            })}

            {childFiles.length > 0 && childFiles.map(childFile => {
                return <File key={childFile.id} file={childFile} />
            })}
        </section>
    )
}

/*
    TO DO 
    - Display Error message (Toast) on trying to upload a file that is too large
    - Display icon based on file type
    - Update Folder & File names
    - Delete Folders & Files
    - Allow users to change color themes
*/