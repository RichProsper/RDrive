import PrivateNav from '../components/layouts/PrivateNav'
import AddFolderButton from '../components/rdrive/AddFolderButton'
import Folder from '../components/rdrive/Folder'
import useFolder from '../components/hooks/useFolder'
import { useParams } from 'react-router'

export default function Home() {
    const { folderId } = useParams()
    const { folder, childFolders } = useFolder(folderId)

    return (
        <section>
            <PrivateNav />
            
            <AddFolderButton currentFolder={folder} />

            {childFolders.length > 0 && childFolders.map(childFolder => {
                return <Folder key={childFolder.id} folder={childFolder} />
            })}
        </section>
    )
}
