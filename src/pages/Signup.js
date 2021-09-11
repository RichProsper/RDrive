import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'
import Form from '../components/forms/Form'
import Alert from '../components/forms/Alert'
import Input from '../components/forms/Input'
import SubmitButton from '../components/forms/SubmitButton'

export default function Signup() {
    const { signup, errMsgSignUp, setErrMsgSignUp } = useAuthCtx()
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
        // console.log(form.email.value, form.pass.value, form.passConfirm.value)
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
            </Form>

            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </section>
    )
}
