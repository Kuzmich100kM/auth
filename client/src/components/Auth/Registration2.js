import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { inAuthPageAC, userRegistrationTC } from "../../reducers/user.reducer"
import { useDispatch, useSelector } from "react-redux"
import Alerts from "../Alerts"

export default function Registration() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuth } = useSelector(state => state.user)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const changeEmail = e => setEmail(e.target.value)
	const changePassword = e => setPassword(e.target.value)

	const goLogin = () => navigate("/login2")

	const sendData = e => {
		e.preventDefault()
		dispatch(userRegistrationTC(email, password))
	}

	useEffect(() => {
		dispatch(inAuthPageAC(true)) // for hide button "Login" in header
		isAuth && navigate("/")
		return () => dispatch(inAuthPageAC(false))
	}, [isAuth, navigate, dispatch])

	return (
		<div className="register">
			<h4>Регистрация</h4>
			<form onSubmit={sendData} autoComplete="off">
				<div className="form-group">
					<input type="input" onChange={changeEmail} id="email" value={email} />
					<label htmlFor="email">email</label>
				</div>
				<div className="form-group">
					<input type="password" onChange={changePassword} id="password" value={password} />
					<label htmlFor="password">password</label>
				</div>
				<button className="btn-link" type="button" onClick={goLogin}>
					Войти
				</button>
				<button className="btn-submit" type="submit">
					Готово
				</button>
			</form>
			<Alerts />
		</div>
	)
}
