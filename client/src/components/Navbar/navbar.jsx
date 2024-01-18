import React, { useState } from 'react'
import classes from './navbar.module.css'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../redux/authSlice"
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
      }
    
      const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
     }

     console.log("Navbar rendered with user:", user);


  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>
            <h2 className={classes.title}>I- Tourism Planner</h2>
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
            <li className={classes.listItem}><Link to="/">Home</Link></li>
            {user && user.isAdmin && (
              <>
                <li className={classes.listItem}><Link to="/table">Table</Link></li>
                <li className={classes.listItem}><Link to="/create">Create</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className={classes.right}>
          {!user ? (
            <>
              <Link to='/login' className={classes.login}>Login</Link>
              <Link to='/signup' className={classes.signup}>Sign up</Link>
            </>
          ) : (
            <>
              {user.isAdmin && <p className={classes.adminLabel}>Admin</p>}
              {user && user.username && <p className={classes.username}>User: {user.username}</p>}
              <button className={classes.logout} onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar