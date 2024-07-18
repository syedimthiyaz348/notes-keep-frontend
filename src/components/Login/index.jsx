import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const passwordType = 'password'
const textType = 'text'

const LoginPage = props => {
    const [showingPassword, setShowingPassword] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        let token = Cookies.get("jwtToken")
        if (token !== undefined){
            navigate('/')
        }
    }, [])

    const onShowingPassword = event => {
        setShowingPassword(event.target.checked)
    }

    const handlingUsername = event => {
        setUsername(event.target.value)
    }

    const handlingPassword = event => {
        setPassword(event.target.value)
    }

    const onLoggingIn = async event => {
        event.preventDefault();
        const enteredUserDetails = {username, password}
        const loginUrl = 'https://keep-notes-black.vercel.app/login';
        const options = {
            method:"POST",
            body: JSON.stringify(enteredUserDetails),
            headers : {
                'Content-Type':'application/json'
            }
        }
        const response = await fetch(loginUrl, options)
        const data = await response.json()
        //console.log(data.token)
        if (response.ok === true){
            const token = data.token
            Cookies.set('jwtToken', token, {expires:5})
            navigate('/')
        }
    }


    const changingPasswordType = showingPassword? textType : passwordType

    return(
        <div className="login-page-container">
            <h1>Login</h1>
            <form className='form-container' onSubmit={onLoggingIn}>
                <input className='login-input' value={username} onChange={handlingUsername} placeholder='Username' id="username" type="text"/>
                <input className='login-input' value={password} onChange={handlingPassword} placeholder='Password' id="password" type={changingPasswordType}/>
                <div className='checkbox-container'>
                    <input onChange={onShowingPassword} id="showpassword" type='checkbox'/>
                    <label htmlFor='showpassword'>Show Password</label>
                </div>
                <div className='button-container'>
                <button className='login-button' type='submit'>Login</button>
                <button className='login-button' type='button'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage