import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { authUser, logoutUser } from './redux';
import { connect } from 'react-redux';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, doc, setDoc, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { return_helper_text } from "./ErrorCodes.js";

import DOMPurify from 'dompurify';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';

import Nav from './Nav';

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        username: state.auth.username,
        f_name: state.auth.f_name,
        l_name: state.auth.l_name,
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: (email, username, f_name, l_name, userObj) => dispatch(authUser(email, username, f_name, l_name, userObj)),
        logoutUser: () => dispatch(logoutUser())
    }
}

function Login(props) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false);

    const resetErrors = () => {
        setError(false);
        setErrorMsg("");
    }

    const setupState = (uid) => {
        // uses the UID from user.credential
        const newUser = firebase.firestore().collection('users').doc(uid);
        newUser.get()
            .then(doc => {
                // get data and put it in state
                const res = doc.data();
                props.authUser(res.email, res.username, res.f_name, res.l_name, newUser);
            })
    }

    const handleSubmit = () => {
        setLoading(true);
        // clean inputs
        const cleanEmail = DOMPurify.sanitize(email);
        const cleanPass = DOMPurify.sanitize(pass);        

        // get authentication from firebase
        const auth = getAuth();

        // create new email with firebase
        signInWithEmailAndPassword(auth, cleanEmail, cleanPass)
            .then((userCredential) => {
                // User is now signed in.
                const user = userCredential.user
                setupState(user.uid);
                resetErrors();
                setSuccess(true); 
            })
            .catch((error) => {
                const formatted = return_helper_text(error.code);
                setError(true);
                setErrorMsg(formatted);
                console.log(error)
                console.log(error.code);
            })
        setLoading(false);
    }

    return(
        <>
        <Nav/>
        {
        success && props.loggedIn ? <div className="login-success">
            <h2>Welcome back {props.f_name}!</h2>
            <div>Get back to the action using the button below.</div>
            <br></br><br></br>
            <Link to="/"><LoadingButton variant="contained">Homepage</LoadingButton></Link>
        </div>
        :
        <div className="auth-content">
            <h2>Good to see you back.</h2>
            <div className="auth-login-textfields">
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={error}
                    helperText={errorMsg}
                    label={"Email"} //optional
                />

                <TextField
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    error={error}
                    type="password"
                    label={"Password"} //optional
                />
            </div>
            <div>
                {
                    // Disable / enable button depending on pass strength
                    pass.length >= 0 && email.length > 1
                    ? <LoadingButton onClick={handleSubmit} loading={loading} fullWidth variant="contained">Login</LoadingButton> 
                    : <Tooltip title="Please fill in all fields accurately">
                        <span>
                            <LoadingButton type="submit" fullWidth disabled variant="contained">Login</LoadingButton>
                        </span>
                    </Tooltip>
                }
                <br></br><br></br>
                <span id="register-to-log-in">Don't have an account yet? Click <Link to="/Register">here.</Link></span>
            </div>
        </div>
        }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)