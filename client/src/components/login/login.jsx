import img from '../../assets/img2.png'
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'
import classes from './login.module.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const headers = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
   
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const handleLogin = async(e) => {
    e.preventDefault()
    
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }


    if (!passwordRegex.test(password)) {
      setError("Password should have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number");
      return;
    }


    try {
      const res = await fetch(`http://localhost:5000/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
  }  
        if(res.status === 404){
            throw new Error("Wrong credentials")
        }
        const data = await res.json();
if (data && data.token) {
  localStorage.setItem("token", data.token);
}
console.log("Token after login:", localStorage.getItem('token'));
navigate('/create');
        dispatch(login(data))
        navigate('/')
    } catch (error) {
        setError(prev => true)
        setTimeout(() => {
            setError(prev => false)
        }, 2500)
    }
  }
  return (
    <div className={classes.loginContainer}>
     <div className={classes.loginWrapper}>
       <div className={classes.loginLeftSide}>
         <img src={img} className={classes.leftImg}/>
       </div>
       <div className={classes.loginRightSide}>
         <h2 className={classes.title}>Login</h2>
         <form onSubmit={handleLogin} className={classes.loginForm}>
         <input 
    type="email" 
    placeholder="Type email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)}
/>
<input 
    type="password" 
    placeholder="Type password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)}
/>
           <button className={classes.submitBtn}>Login</button>
           <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
         </form>
         {error && 
           <div className={classes.errorMessage}>
                Wrong credentials! Try different ones.
            </div>
            }
       </div>
     </div>
    </div>
  )
}

export default Login