import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { authUser, logoutUser } from './redux';
import { connect } from 'react-redux';

import { getFirestore, doc, setDoc, query, collection, where } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { return_helper_text } from "./ErrorCodes.js";

import DOMPurify from 'dompurify';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';

import PasswordStrengthBar from 'react-password-strength-bar';
import Nav from './Nav';

// firebase restrictions mean that passwords must be at least 6 in length
const MIN_LENGTH = "6"
const MIN_STRENGTH = 4  

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        username: state.auth.username,
        f_name: state.auth.f_name,
        l_name: state.auth.l_name,
        userObj: state.auth.userObj,
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: (email, username, f_name, l_name, userObj) => dispatch(authUser(email, username, f_name, l_name, userObj)),
        logoutUser: () => dispatch(logoutUser())
    }
}

function Register(props) {
    const db = getFirestore();

    const [email, setEmail] = useState("");
    const [username, setUser] = useState("");
    const [name, setName] = useState("");

    const [pass, setPass] = useState("");
    const [strength, setStrength] = useState(0);

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [success, setSuccess] = useState(false); 

    const split_names = () => {
        return name.split(" ");
    }

    const resetErrors = () => {
        setError(false);
        setErrorMsg("");
    }

    const handleSubmit = () => {
        const names = split_names();
        // clean inputs
        const cleanUser = DOMPurify.sanitize(username);
        const f_name = DOMPurify.sanitize(names[0]);
        const l_name = DOMPurify.sanitize(names[1]);
        const cleanEmail = DOMPurify.sanitize(email);
        const cleanPass = DOMPurify.sanitize(pass);

        // get authentication from firebase
        const auth = getAuth();

        
        // create new email with firebase
        createUserWithEmailAndPassword(auth, cleanEmail, cleanPass)
            .then((userCredential) => {
                // User is now signed/registered in.
                const user = userCredential.user;
                const uid = user.uid;
                
                // commit to DB
                const user_info = {
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    username: cleanUser,
                    f_name: f_name,
                    l_name: l_name,
                    email: cleanEmail
                };
                const user_ref = doc(db, 'users', uid);
                setDoc(user_ref, user_info);

                const newUser = firebase.firestore().collection('users').id(uid);

                // Update state and Navigate.
                resetErrors();
                setSuccess(true);
                props.authUser(cleanEmail, cleanUser, f_name, l_name, newUser);

            })
            .catch((error) => {
                const formatted = return_helper_text(error.code);
                setError(true);
                setErrorMsg(formatted);
                console.log(error);
            })
    }

    return(
        <>
        <Nav/>
        {
        success ? 
        <div className="reg-success">
            <h2>Success!</h2>
            <div>
                <p>Thanks for signing up! Head to the homepage by clicking the button below.
                 Have fun browsing, posting, and more!</p>
            </div>
            <Link to="/"><LoadingButton variant="contained">Go To Home</LoadingButton></Link>
        </div> 
        :
        <div className="auth-content">
            <h2>Start by signing up below!</h2>
            <div className="auth-textfields">
                <div className="email-pass">
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={error}
                        helperText={errorMsg}
                        fullWidth
                        label={"Email"} //optional
                    />

                    <TextField
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type="password"
                        fullWidth
                        label={"Password"} //optional
                    />
                    <PasswordStrengthBar onChangeScore={(e) => setStrength(e)} password={pass} minLength={MIN_LENGTH}/>
                </div>
                <div className="username-fullname">
                    <TextField
                        onChange={(e) => setUser(e.target.value)}
                        value={username}
                        fullWidth
                        label={"Username"} //optional
                    />

                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        fullWidth
                        label={"Full Name"} //optional
                    />
                </div>
            </div>
            <div>
                {
                    // Disable / enable button depending on field validity / password strength
                    strength === MIN_STRENGTH && email.length > 1 && username.length > 3 && name.length > 2
                    ? <LoadingButton loadingIndicator="Loading..." onClick={handleSubmit} fullWidth variant="contained">Register</LoadingButton> 
                    : <Tooltip title="Please improve your password strength">
                        <span>
                            <LoadingButton type="submit" fullWidth disabled variant="contained">Register</LoadingButton>
                        </span>
                    </Tooltip>
                }
                <br></br><br></br>
                <span id="register-to-log-in">Already have an account? Click <Link to="/login">here.</Link></span>
            </div>
        </div>
        }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)