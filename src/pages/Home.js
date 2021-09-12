import useAuthCtx from '../contexts/AuthContext'
import LoadingOverlay from '../components/layouts/LoadingOverlay'

export default function Home() {
    const { signout, isLoading } = useAuthCtx()

    return (
        <section>
            <h1>Home Page</h1>
            <button type="button" onClick={signout}>Sign Out</button>
            {isLoading && <LoadingOverlay />}
        </section>
    )
}
