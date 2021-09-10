import useAuthCtx from '../contexts/AuthContext'

export default function Home() {
    const { signout } = useAuthCtx()

    return (
        <section>
            <h1>Home Page</h1>
            <button type="button" onClick={signout}>Sign Out</button>
        </section>
    )
}
