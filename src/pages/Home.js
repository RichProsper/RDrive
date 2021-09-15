import PrivateNav from '../components/layouts/PrivateNav'
import AddFolderButton from '../components/rdrive/AddFolderButton'
import useFolder from '../components/hooks/useFolder'

export default function Home() {
    const { folder } = useFolder('2WNCzV272mi83ADe2MGs')

    return (
        <section>
            <PrivateNav />
            
            <AddFolderButton currentFolder={folder} />
        </section>
    )
}
