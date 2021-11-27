import { useState, useEffect } from "react"

export default function useFormHooks(initModels, initValue, submitCb, valueCb) {
	const [models, setModels] = useState(initModels)
	const [inputs, setInputs] = useState(initValue)
	const [isDoneFirstSubmit, setIsDoneFirstSubmit] = useState(false)

	// Перезаписываем каждое изменение в (inputs)
	// Начинаем валидировать только после первого сабмита (isDoneFirstSubmit &&)
	const inputChange = e => {
		e.persist()
		e.target.type === "checkbox"
			? setInputs({ ...inputs, [e.target.name]: e.target.checked })
			: setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	// Отправляем на валидацию (inputs[m.name]) - это (value) в требуемом поле.
	// Возвращается или (true) или текст ошибки.
	// Если в (initModels/validators/validAlert) мы указали другой текст ошибки,
	//то он имеет повышеннный приоритет
	// Ошибки добавляются в (models), в корень своего объекта (поля)
	const validateInput = m => {
		let alert = null
		m.validators &&
			m.validators.forEach(v => {
				if (v.validFun(inputs[m.name]) !== true)
					v.validAlert ? (alert = v.validAlert) : (alert = v.validFun(inputs[m.name]))
			})
		m.alert = alert
		setModels([...models])
	}
	//const al = useMemo(() => setModels([...models]), [models])

	// Если в пропсах формы есть ф.(valueCb), то при каждом изменении
	//отправляем в ф. сохраненные данные из форм {inputs}.
	// После первого сабмита, каждое изменение в объекте данных {inputs}
	//отправляем на валидацию.
	useEffect(() => {
		valueCb && valueCb(inputs)
		isDoneFirstSubmit &&
			models.forEach(m => {
				//parseInput(m)
				validateInput(m)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputs, isDoneFirstSubmit])

	const handleSubmit = e => {
		e && e.preventDefault()
		models.forEach(m => validateInput(m))
		models.some(m => m.alert) ? setModels([...models]) : submitCb(inputs)
		setIsDoneFirstSubmit(true)
	}

	return [models, inputs, inputChange, handleSubmit]
}

// const parseInput = (input) =>
// 	(input.value = input.parseFun ? input.parseFun(input.value) : input.value)
