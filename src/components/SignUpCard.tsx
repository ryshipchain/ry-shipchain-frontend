import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignUpCard() {

  const dataRedirect = useNavigate();

  const [fnameError, setFnameError] = React.useState(false);
  const [fnameErrorMessage, setFnameErrorMessage] = React.useState('');
  const [lnameError, setLnameError] = React.useState(false);
  const [lnameErrorMessage, setLnameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();


    if (fnameError || lnameError || emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
     axios.post('https://dev-ry-shipchain-backend.onrender.com/api/auth/register', {
      firstName: data.get('fname'),
      lastName: data.get('lname'),
      email: data.get('email'),
      password: data.get('password'),
      role: 'shipper'
    })
    .then((response) => {
      console.log(response.data);
      dataRedirect('/');
    })
    .catch((error) => {
      console.error(error.response.data);
      toast.error(error.response.data.message);
      const fname = document.getElementById('fname') as HTMLInputElement;
      const lname = document.getElementById('lname') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      fname.value = '';
      lname.value = '';
      email.value = '';
      password.value = '';
    });
    
  

  };

  const validateInputs = () => {
    const fname = document.getElementById('fname') as HTMLInputElement;
    const lname = document.getElementById('lname') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!fname.value || fname.value.length < 4) {
      setFnameError(true);
      setFnameErrorMessage('First name must be at least 4 characters long.');
      isValid = false;
    } else {
      setFnameError(false);
      setFnameErrorMessage('');
    }

    if (!lname.value || lname.value.length < 1) {
      setLnameError(true);
      setLnameErrorMessage('Last name must be at least 1 characters long.');
      isValid = false;
    } else {
      setLnameError(false);
      setLnameErrorMessage('');
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="fname">First Name</FormLabel>
          <TextField
            error={fnameError}
            helperText={fnameErrorMessage}
            id="fname"
            type="text"
            name="fname"
            placeholder="Enter your name"
            autoComplete="fname"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={fnameError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lname">Last Name</FormLabel>
          <TextField
            error={lnameError}
            helperText={lnameErrorMessage}
            id="lname"
            type="text"
            name="lname"
            placeholder="Enter your last name"
            autoComplete="lname"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={lnameError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign Up
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          You have an account?{' '}
          <span>
            <NavLink to={'/'}>Sign In</NavLink>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign up with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign up with Facebook')}
          startIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>
      </Box>
    </Card>
  );
}
