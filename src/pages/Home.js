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
import ContextMenu from '../components/rdrive/contextmenu/ContextMenu'

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

            <ContextMenu />
        </section>
    )
}