
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '@elastic/eui/dist/eui_theme_light.css';
import { useHistory } from 'react-router-dom';
import {
    EuiPage,
    EuiPageBody,
    EuiFieldText,
    EuiButton,
    EuiForm,
    EuiCallOut,
    EuiCard,
    EuiText,
    EuiFieldPassword,
    EuiFlexGroup,
    EuiSpacer,
  } from '@elastic/eui';


   const LoginState = () =>{
    const [newUsername, setNewUsername] = useState('') 
    const [newPassowrd, setNewPassword] = useState('') 
    const [message, setM] = useState('') 
    const [lors,setlors] = useState("signup");

    const history = useHistory();

    const signupf = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url:'https://engo500.herokuapp.com/user',
            data: {
              username: newUsername,
              password: newPassowrd,
            }
          }).then(res => {
            setM('success')
            setNewUsername('')
            setNewPassword('')
            setTimeout(()=>setM(''),3000)
          })
          .catch(error => {
            setM('error')
            setNewUsername('')
            setNewPassword('')
            setTimeout(()=>setM(''),3000)
          })
    }
    
    const loginf = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url:'https://engo500.herokuapp.com/login',
            data: {
              username: newUsername,
              password: newPassowrd,
            }
        }).then(res => {
            setM('success')
            setNewUsername('')
            setNewPassword('')
            window.localStorage.setItem('loggedInUser', JSON.stringify(res))
            setTimeout(()=> history.push('/dashboard'),3000)
          }).catch(error => {
            setM('error')
            setNewUsername('')
            setNewPassword('')
            setTimeout(()=>setM(''),3000)
          })

    }
    
    if(lors === "signup") {
        return (
            <EuiCard style={{maxWidth:'600px', justifyContent:'center',}}>
            {(() => {
                switch (message) {
                case "success" : return <EuiCallOut title="Signup successful. Please login."color="success" iconType="user"></EuiCallOut>
                case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
                default: return <></>
                }
            })()}
            <EuiText><h1>Signup</h1></EuiText>
            <EuiSpacer></EuiSpacer>
            <EuiForm component="form" onSubmit={signupf}>
            <EuiFieldText
                    placeholder="Username"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <EuiSpacer></EuiSpacer>
            <EuiFieldPassword
                    placeholder="Password"
                    fullWidth
                    value={newPassowrd}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <EuiSpacer></EuiSpacer>
            <EuiButton type="submit">Submit</EuiButton>
            <EuiSpacer></EuiSpacer>
            <EuiText><p>Already have an account? <a onClick ={()=>{setlors("login")}}>Sign in.</a></p></EuiText>
            </EuiForm>

        </EuiCard>
        )
    }
    return (
        <EuiCard style={{maxWidth:'600px', justifyContent:'center',}}>
            {(() => {
                switch (message) {
                case "success" : return <EuiCallOut title="Login successful. Redirecting you to the dashboard."color="success" iconType="user"></EuiCallOut>
                case "error" : return <EuiCallOut title="Something went wrong. Please try again."color="danger" iconType="alert"></EuiCallOut>
                default: return <></>
                }
            })()}
            <EuiText><h1>Login</h1></EuiText>
            <EuiSpacer></EuiSpacer>
            <EuiForm component="form" onSubmit={loginf}>
            <EuiFieldText
                    placeholder="Username"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <EuiSpacer></EuiSpacer>
            <EuiFieldPassword
                    placeholder="Password"
                    fullWidth
                    value={newPassowrd}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <EuiSpacer></EuiSpacer>
            <EuiButton type="submit">Submit</EuiButton>
            <EuiSpacer></EuiSpacer>
            <EuiText><p>Don't have an account? <a onClick ={()=>{setlors("signup")}}>Sign up.</a></p></EuiText>
            </EuiForm>

        </EuiCard>
    )
}


const Login = () => {

    

    return (
        <>
        <EuiPage style={{display:'flex', height:'100vh'}}>
        <EuiPageBody component="div">
            <EuiFlexGroup justifyContent='center' alignItems='center'>
            <LoginState/>
            </EuiFlexGroup>
        </EuiPageBody>
        </EuiPage>
        </>
    
    )

}

export default Login;
