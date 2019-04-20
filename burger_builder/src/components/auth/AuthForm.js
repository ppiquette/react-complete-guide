import React from 'react'
import { Field, reduxForm } from 'redux-form'
import cssClasses from './AuthForm.module.css'
import Button from '../UI/Button';



const required = value => (value ? undefined : 'Required')

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined

const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div className={cssClasses.Field}>
            <label className={cssClasses.Label} >
                {label}
                <input {...input} placeholder={label} type={type} />
            </label>
            <div>
                {/* the && operator return the last evaluated thing, here the string in "error" */}
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}

let AuthForm = props => {
    const { handleSubmit, pristine, submitting, invalid } = props
    return (
      <form className={cssClasses.AuthForm} onSubmit={ handleSubmit }>

        <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
            validate={[email, required]}
            warn={aol}
        />

        <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
            validate={[required, maxLength15, minLength2]}
            warn={alphaNumeric}
        />

        <Button disabled={pristine || submitting || invalid} buttonType='Success'>Submit</Button>
      </form>
  )
}

export default reduxForm({
  form: 'authForm'
})(AuthForm)