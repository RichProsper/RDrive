import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'
import Form from '../components/forms/Form'
import Alert from '../components/forms/Alert'
import Input from '../components/forms/Input'
import SubmitButton from '../components/forms/SubmitButton'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import classes from '../components/layouts/Layout.module.css'

export default function Signin() {
    const { signin, errMsgSignIn, setErrMsgSignIn, isLoading } = useAuthCtx()
    const formId = 'form'

    useEffect(() => {
        return () => setErrMsgSignIn('')
    }, [setErrMsgSignIn])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        const form = document.querySelector(`#${formId}`)
        signin(form.email.value, form.pass.value)
    }    

    return (
        <>
            <h1>Sign In</h1>

            <Form id={formId} onSubmit={submitForm}>
                <Alert type="Error" message={errMsgSignIn} />

                <Input 
                    name="email" 
                    type="email"
                    placeholder="Email *"
                    autoFocus
                    required 
                />
                <Input 
                    name="pass" 
                    type="password"
                    placeholder="Password *"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                    " and at least 8 or more characters"}
                />

                <SubmitButton text='Sign In' />

                <p className={classes.auth}>
                    Already have an account?<Link to="/signup" className={classes.link}>Sign Up</Link>
                </p>
                <p className={classes.auth}>
                    Forgot Password? Click<Link to="/reset-password" className={classes.link}>Here</Link>to reset.
                </p>
            </Form>

            {isLoading && <LoadingOverlay />}
        </>
    )
}