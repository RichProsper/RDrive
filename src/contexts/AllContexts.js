import { AuthContextProvider } from "./AuthContext"

export default function AllContexts({ children }) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}