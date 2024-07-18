import { useEffect } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
const ProtectedRoute = (props) => {
    const {Component} = props
    const navigate = useNavigate()
    useEffect(() => {
        let token = Cookies.get("jwtToken")
        if (token === undefined){
            navigate('/login')
        }
    }, [])
    return(
        <div>
            <Component/>
        </div>
    )
}

export default ProtectedRoute