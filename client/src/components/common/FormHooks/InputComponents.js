import React, { useState } from "react"

export function Input({ name, label, value, type, alert, inputChange, className, placeholder }) {
	const [isPassword, setIsPassword] = useState(type)

	const showHidePass = () => {
		isPassword === "input" ? setIsPassword("password") : setIsPassword("input")
	}

	return (
		<div className={className ? `form-group ${className}` : `form-group`}>
			{alert && <div className="error">{alert}</div>}
			<input
				id={name}
				name={name}
				type={isPassword}
				onChange={inputChange}
				defaultValue={value || null}
				placeholder={placeholder || " "}
			/>
			<label htmlFor={name}>{label}</label>
			<div className="eye" onClick={showHidePass}></div>
		</div>
	)
}
export function Select({ name, label, value, type, options, inputChange, className }) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className={className ? `form-group ${className}` : `form-group`}>
			<div className={isOpen ? "selecter open" : "selecter"} onClick={() => setIsOpen(!isOpen)}>
				<div className="trigger" name={name}>
					<div>{value}</div>
					<div className="arrow-wrap">
						<div className="arrow"></div>
					</div>
				</div>
				{options && (
					<div className="options">
						{options.map(o => (
							<input
								className={o.value === value ? `option active` : `option`}
								key={o.value}
								type={type}
								name={name}
								defaultValue={o.value}
								onClick={inputChange}
							/>
						))}
					</div>
				)}
				<label htmlFor={name}>{!value && label}</label>
			</div>
		</div>
	)
}

export function Checkbox({ name, label, value, alert, inputChange, className }) {
	return (
		<div className={className ? `form-group ${className}` : `form-group`}>
			{alert && <div className="error">{alert}</div>}
			<input id={name} name={name} type="checkbox" value={value} checked={value || false} onChange={inputChange} />
			<label htmlFor={name}>{label}</label>
		</div>
	)
}

export function Radio({ name, label, value, checked, alert, options, inputChange, className }) {
	return (
		<div className={className ? `form-group ${className}` : `form-group`}>
			{alert && <div className="error">{alert}</div>}
			{options &&
				options.map(o => (
					<div key={o.value} className="radio">
						<input
							id={o.name}
							name={name}
							type="radio"
							value={o.value}
							checked={value === o.value}
							onChange={inputChange}
						/>
						<label htmlFor={o.name}>{o.name}</label>
					</div>
				))}
		</div>
	)
}

export function Textarea({ name, label, value, alert, placeholder, rows, cols, inputChange, className }) {
	return (
		<div className={className ? `form-group ${className}` : `form-group`}>
			{alert && <div className="error">{alert}</div>}
			<textarea
				id={name}
				name={name}
				defaultValue={value}
				type="textarea"
				rows={rows}
				cols={cols}
				placeholder={placeholder}
				onChange={inputChange}></textarea>
			{label && <label htmlFor={name}>{label}</label>}
		</div>
	)
}
export function Divider({ name, className }) {
	return <div className={className ? `form-group ${className}` : `form-group`}>{name}</div>
}
