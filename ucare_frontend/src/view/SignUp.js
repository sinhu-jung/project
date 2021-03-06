import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, Radio, RadioGroup, Container } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import userService from '../service/userService';
import Footter from '../layout/Footer';

const useStyles = makeStyles((theme) => ({
  paper: {
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 5px #BABABA',
    padding: '30px 5px 70px 5px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflowY: 'scroll',
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "&::before":{
      content: '""',
      height: '100vh',
      width: '100%',
      backgroundSize: '100% 100%',
      zIndex: -1,
      position: 'fixed',
    }
  }
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [ssn, setSSN] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [telNo, setTelNo] = useState('');
  const [role, setRole] = useState('');
  const [remark, setRemark] = useState('');

  const options = ['??????', '?????????'];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (ssn.length === 13) {
      setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
    }
  }, [ssn, telNo]);

  const idChange = (e) => {
    setId(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const hasError = passwordEntered =>
    password.length < 5 ? true : false;

  const hasNotSameError = passwordEntered =>
    password != confirmPassword ? true : false; 

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const genderChange = (e) => {
    setGender(e.target.value)
  }

  const ssnChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setSSN(e.target.value);
    }
  }

  const addressChange = (e) => {
    setAddress(e.target.value)
  }

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const roleChange = (e) => {
    setRole(e.target.value)
  }

  const saveUser = (e) => {
    e.preventDefault(); // ?????? ?????? ????????? ????????? ????????? ???????????? ?????? ?????? ?????????.

    if(password !== confirmPassword){
      return alert('??????????????? ???????????? ????????? ????????? ?????????.');
    }

    let user = {
      id: id,
      password: password,
      name: name,
      gender: gender,
      ssn: ssn,
      email: email,
      address: address,
      telNo: telNo,
      role: role,
      remark: remark
    }

    userService.addUser(user)
    .then( res => {
        console.log(user.name + '?????? ??????????????? ?????????????????????.');
        history.push('/');
    })
    .catch( err => {
      console.log('saveUser() ??????', err);
    });
  }

  return (
    <div className={classes.image}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ????????????
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                value={ id }
                onChange={ idChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                error={hasError('password')} // ?????? ?????????????????? error ????????? ??????
                label="????????????(5??? ??????)"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ password }
                onChange={ passwordChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                error={hasNotSameError('confirmPassword')} // ?????? ?????????????????? error ????????? ??????
                helperText={
                  hasNotSameError('confirmPassword') ? "????????? ??????????????? ???????????? ????????????." : null
                } // ????????? ???????????? ?????? ?????? ??????
                label="???????????? ??????"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={ confirmPassword }
                onChange={ confirmPasswordChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="??????"
                name="name"
                autoComplete="name"
                value={ name }
                onChange={ nameChange }
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" value={ gender } onChange={ genderChange } >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ssn"
                label="??????????????????"
                name="ssn"
                value={ ssn }
                onChange={ ssnChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={ email }
                onChange={ emailChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="??????"
                name="address"
                autoComplete="address"
                value={ address }
                onChange={ addressChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="telNo"
                label="?????????"
                name="telNo"
                value={ telNo }
           
                onChange={ telNoChange }
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={ role }
                onChange={(event, newValue) => {
                  setRole(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="role"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="??????" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="????????? ???????????????."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ saveUser }
          >
            ??????
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Footter />
    </div>
  );
}