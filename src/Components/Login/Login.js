import React, { useRef, useContext } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import AuthContext from '../../Store/auth-context';
import { useHistory } from 'react-router-dom';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
const Login = () => {

    const paperStyle = { padding: 20, height: '57vh', width: 500, margin: "20px auto", backgroundColor: "#fafafa" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    const authCtx = useContext(AuthContext);

    // const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {

        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

  

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                //   setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                console.log(data);
                authCtx.login(data.idToken);
                console.log(authCtx)
                // history.replace('/Home');
            })
            .catch((err) => {
                alert(err.message);
            });

    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>R</Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={submitHandler}>

                    <TextField label='Username' placeholder='Enter username' inputRef={emailRef} fullWidth required />
                    <br />
                    <br />
                    <TextField label='Password' placeholder='Enter password' type='password' inputRef={passwordRef} fullWidth required />
                    <br />
                    <br />
                    {/* <FormControlLabel
                    control={
                        <Checkbox
                        name="checkedB"
                        color="primary"
                        />
                        
                    }
                    label="Remember me"
                /> */}
                    <br />
                    <br />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    {/* <Typography >
                    <Link href="#" >
                    Forgot password ?
                    </Link>
                </Typography> */}
                </form>
            </Paper>
        </Grid>
    )
}

export default Login