import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import CircularProgress from '@material-ui/core/CircularProgress';
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

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const usuario = e.target.value;
        setUsername(usuario);
    };

    const onChangePassword = (e) => {
        const senha = e.target.value;
        setPassword(senha);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context_errors.length === 0) {
            AuthProvider.login(username, password).then(
                () => {
                    props.history.push("/boarduser");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Form onSubmit={handleLogin} ref={form}>
                <label htmlFor='username'>Username</label>
                <Input
                    type='text'
                    className='form-control'
                    name='username'
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                />

                <label htmlFor='password'>Password</label>
                <Input
                    type='password'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                />

                <FormContent>
                    <Button>
                        {loading && (
                            <div className={classes.root}>
                                <CircularProgress />
                            </div>
                        )}
                    </Button>
                </FormContent>

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
    )
}

export default Login;
