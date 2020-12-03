import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { AuthProvider } from '../../services/auth.service';

import { Container, Button, FormContent, useStyles } from './styles';

const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                Esse campo é obrigatório.
            </div>
        );
    }
    return undefined;
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className='alert alert-danger' role='alert'>
                Email inválido.
            </div>
        );
    }
    return undefined;
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className='alert alert-danger' role='alert'>
                O usuário deve conter entre 3 e 20 caracteres.
            </div>
        );
    }
    return undefined;
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className='alert alert-danger' role='alert'>
                A senha deve conter entre 6 e 40 caracteres.
            </div>
        );
    }
    return undefined;
};


const Register = () => {
    const classes = useStyles();
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email] = useState("");
    const [password] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const usuario = e.target.value;
        setUsername(usuario);
    };

    const onChangeEmail = (e) => {
        const emailaux = e.target.value;
        setUsername(emailaux);
    };

    const onChangePassword = (e) => {
        const senha = e.target.value;
        setUsername(senha);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context_errors.length === 0) {
            AuthProvider.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    }

    return (
        <Container>
            <Form onSubmit={handleRegister} ref={form} className={classes.form}>
                {!successful && (
                    <div>
                        <label htmlFor='username' >Username</label>
                        <Input
                            type='text'
                            className='form-control'
                            id='username'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />

                        <label htmlFor='email'>Email</label>
                        <Input
                            type='text'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />

                        <label htmlFor='password'>Password</label>
                        <Input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />

                        <FormContent>
                            <Button>
                                Sign Up
                            </Button>
                        </FormContent>
                    </div>
                )}

                {message && (
                    <FormContent>
                        <div className='alert alert-danger' role='alert'>
                            {message}
                        </div>
                    </FormContent>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </Container>
    );
};

export default Register;