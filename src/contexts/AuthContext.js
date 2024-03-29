import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import {
    onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, sendPasswordResetEmail
} from 'firebase/auth'
import { useHistory } from 'react-router'

const AuthContext = createContext({
    currentUser: {},
    signup: (email, pass, passConfirm) => {},
    signin: (email, pass) => {},
    signout: () => {},
    resetPassword: email => {},
    errMsgSignUp: '',
    setErrMsgSignUp: msg => {},
    errMsgSignIn: '',
    setErrMsgSignIn: msg => {},
    errMsgResetPass: '',
    setErrMsgResetPass: msg => {},
    successMsgResetPass: '',
    setSuccessMsgResetPass: msg => {},
    isLoading: false,
    loadingUser: true
})

export default function useAuthCtx() {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [errMsgSignUp, setErrMsgSignUp] = useState('')
    const [errMsgSignIn, setErrMsgSignIn] = useState('')
    const [errMsgResetPass, setErrMsgResetPass] = useState('')
    const [successMsgResetPass, setSuccessMsgResetPass] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoadingUser(false)
        })
        return unsubscribe
    }, [])

    /**
     * @param {String} email
     * @param {String} pass
     * @param {String} passConfirm
     */
    const signup = async (email, pass, passConfirm) => {
        if (pass !== passConfirm) return setErrMsgSignUp('Passwords do not match!')

        try {
            setErrMsgSignUp('')
            setIsLoading(true)
            await createUserWithEmailAndPassword(auth, email, pass)
            history.push('/')
        }
        catch(e) {
            if (e.code === 'auth/email-already-in-use') {
                setErrMsgSignUp('Sign Up Failed! Account already exists.')
            }
            else {
                setErrMsgSignUp('Sign Up Failed!')
                console.error(e)
            }
        }

        setIsLoading(false)
    }

    /**
     * @param {String} email 
     * @param {String} pass 
     */
    const signin = async (email, pass) => {
        try {
            setErrMsgSignIn('')
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, pass)
            history.push('/')
        }
        catch(e) {
            switch(e.code) {
                case 'auth/user-not-found':
                    setErrMsgSignIn('Sign In failed! Incorrect Email.')
                    break

                case 'auth/wrong-password':
                    setErrMsgSignIn('Sign In failed! Incorrect Password')
                    break

                default:
                    setErrMsgSignIn('Sign In failed!')
                    console.error(e)
            }
        }

        setIsLoading(false)
    }

    const signout = async () => {
        try {
            setIsLoading(true)
            await signOut(auth)
            history.push('/signin')
        }
        catch(e) {
            console.error(e)
        }

        setIsLoading(false)
    }

    /**
     * @param {String} email 
     */
    const resetPassword = async email => {
        try {
            setErrMsgResetPass('')
            setIsLoading(true)
            await sendPasswordResetEmail(auth, email, {
                url: 'https://relaxed-gates-05f280.netlify.app/signin',
                handleCodeInApp: false
            })
            setSuccessMsgResetPass(`Success! Reset password link was sent to your email.`)
        }
        catch(e) {
            setSuccessMsgResetPass('')

            if(e.code === 'auth/user-not-found') {
                setErrMsgResetPass(`Reset Password Failed! Account not found.`)
            }
            else {
                setErrMsgResetPass('Reset Password Failed!')
                console.error(e)
            }
        }

        setIsLoading(false)
    }

    const context = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        errMsgSignUp,
        setErrMsgSignUp,
        errMsgSignIn,
        setErrMsgSignIn,
        errMsgResetPass,
        setErrMsgResetPass,
        successMsgResetPass,
        setSuccessMsgResetPass,
        isLoading,
        loadingUser
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
