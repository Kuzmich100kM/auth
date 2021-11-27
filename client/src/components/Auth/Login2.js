import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userLoginTC, inAuthPageAC } from "../../reducers/user.reducer"
import { useDispatch, useSelector } from "react-redux"
import Alerts from "../Alerts"

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth } = useSelector(state => state.user)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const changeEmail = e => setEmail(e.target.value)
	const changePassword = e => setPassword(e.target.value)

	const goRegistration = () => navigate("/registration2")

	const sendData = e => {
		e.preventDefault()
		dispatch(userLoginTC(email, password))
	}

	useEffect(() => {
		dispatch(inAuthPageAC(true)) // for hide button "Login" in header
		isAuth && navigate(-1)
		return () => dispatch(inAuthPageAC(false))
	}, [isAuth, navigate, dispatch])

	return (
		<div className="login">
			<h4>Войти в систему</h4>
			<form onSubmit={sendData} autoComplete="off">
				<div className="form-group">
					<input type="input" onChange={changeEmail} id="email" value={email} placeholder=" " />
					<label htmlFor="email">email</label>
				</div>
				<div className="form-group">
					<input type="password" onChange={changePassword} id="password" value={password} placeholder=" " />
					<label htmlFor="password">password</label>
				</div>
				<button className="btn-link" type="button" onClick={goRegistration}>
					Регистрация
				</button>
				<button className="btn-submit" type="submit">
					Готово
				</button>
			</form>
			<Alerts />
		</div>
	)
}
