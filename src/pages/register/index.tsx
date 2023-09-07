import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import axios from '../../AuthenticationApis/api'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  textField: {
    marginBottom: '20px',
    width: '100%',
  },
  button: {
    width: '100%',
  },
}));

const RegistrationForm = () => {
  const navigate= useNavigate()
  const [err,setErr]=useState('')
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e:any) => {
   
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e:any) => {
    
    e.preventDefault();
    axios.post('/adduser',formData).then((res)=>{
      alert('registered successfully')
        navigate('/')
    }).catch((err)=>{
      console.log('err')
      setErr('invalid email')
    })
   

  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
       <>
       <h3 style={{padding:0,marginBottom:2}}>Register</h3>
       {err&&<p style={{padding:0,marginBottom:1,color:"red",fontSize:"bold",textAlign:'center'}}>{err}</p>}
       </>
      
      
        <TextField
          className={classes.textField}
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          name="email"
          type='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
        <div style={{marginLeft:100,width:100,padding:5}}>
        <Link to='/'style={{fontSize:"small",textDecoration:'none'}}>login</Link>
        </div>
       
      
      
      </form>
    
     
    
    </div>
  );
};

export default RegistrationForm;
