import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'

export default function Signup() {
    const form = useRef()
    const { signup, errMsgSignUp, setErrMsgSignUp } = useAuthCtx()

    useEffect(() => {
        return () => setErrMsgSignUp('')
    }, [setErrMsgSignUp])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        signup(form.current.email.value, form.current.pass.value, form.current.passConfirm.value)
    }    

    return (
        <section>
            <h1>Sign Up</h1>

            <form ref={form} onSubmit={submitForm}>
                <div>
                    {errMsgSignUp && <span>{errMsgSignUp}</span>}
                </div>

                <input 
                    name="email" 
                    type="email"
                    placeholder="Email..."
                    autoFocus
                    required 
                />
                <input 
                    name="pass" 
                    type="password"
                    placeholder="Password..."
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                    " and at least 8 or more characters"}
                />
                <input 
                    name="passConfirm" 
                    type="password"
                    placeholder="Confirm Password..."
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                    " and at least 8 or more characters"}
                />

                <button type="submit">Sign Up</button>
            </form>

            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </section>
    )
}
