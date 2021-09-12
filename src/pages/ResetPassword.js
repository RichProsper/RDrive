import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'
import Form from '../components/forms/Form'
import Alert from '../components/forms/Alert'
import Input from '../components/forms/Input'
import SubmitButton from '../components/forms/SubmitButton'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import classes from '../components/layouts/Layout.module.css'

export default function ResetPassword() {
    const {
        resetPassword, errMsgResetPass, setErrMsgResetPass, successMsgResetPass, setSuccessMsgResetPass,
        isLoading
    } = useAuthCtx()
    const formId = 'form'

    useEffect(() => {
        return () => {
            setErrMsgResetPass('')
            setSuccessMsgResetPass('')
        }
    }, [setErrMsgResetPass, setSuccessMsgResetPass])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        const form = document.querySelector(`#${formId}`)
        resetPassword(form.email.value)
    }    

    return (
        <section>
            <h1>Reset Password</h1>

            <Form id={formId} onSubmit={submitForm}>
                <Alert type="Error" message={errMsgResetPass} />
                <Alert type="Success" message={successMsgResetPass} />

                <Input 
                    name="email" 
                    type="email"
                    placeholder="Email *"
                    autoFocus
                    required 
                />

                <SubmitButton text='Reset Password' />
            </Form>

            <p className={classes.auth}>
                Ready to signin?<Link to="/signin" className={classes.link}>Sign In</Link>
            </p>

            {isLoading && <LoadingOverlay />}
        </section>
    )
}