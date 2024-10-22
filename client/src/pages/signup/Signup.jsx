import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/artizticamit/">
        Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup(email, password, username);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="signup-container">
        <CssBaseline />
        <div className="signup-wrapper">
          <div className="signup-left">
          <h2 className="signup-heading">
              Welcome to <span style={{color: 'blueviolet'}}>i-Book</span>
            </h2>
            <img
              src="/assets/login-hero.png"
              alt="SignUp Hero"
              className="signup-hero-image"
            />
          </div>

          <div className="signup-right">
            <Box className="signup-box">
              <Avatar className="signup-avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form noValidate className="signup-form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="signup-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="24px" />
                  ) : (
                    'Sign Up'
                  )}
                </Button>
                {error && <div className="error-message">{error}</div>}
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2" >
                      {'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <Copyright />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
