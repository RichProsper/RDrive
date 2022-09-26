import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'
import Form from '../components/forms/Form'
import Alert from '../components/forms/Alert'
import Input from '../components/forms/Input'
import SubmitButton from '../components/forms/SubmitButton'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import classes from '../components/layouts/Layout.module.css'

export default function Signup() {
    const { signup, errMsgSignUp, setErrMsgSignUp, isLoading } = useAuthCtx()
    const formId = 'form'

    useEffect(() => {
        return () => setErrMsgSignUp('')
    }, [setErrMsgSignUp])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        const form = document.querySelector(`#${formId}`)
        signup(form.email.value, form.pass.value, form.passConfirm.value)
    }    

    return (
        <section>
            <h1>Sign Up</h1>

            <Form id={formId} onSubmit={submitForm}>
                <Alert type="Error" message={errMsgSignUp} />

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
                <Input 
                    name="passConfirm" 
                    type="password"
                    placeholder="Confirm Password *"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                    " and at least 8 or more characters"}
                />

                <SubmitButton text='Sign Up' />

                <p className={classes.auth}>
                    Already have an account? <Link to="/signin" className={classes.link}>Sign In</Link>
                </p>
            </Form>

            {isLoading && <LoadingOverlay />}
        </section>
    )
}
