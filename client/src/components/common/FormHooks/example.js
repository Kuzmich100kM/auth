import React from "react"
import FormPanel from "./"
import { isFilled, isInt, isNumber, isNumberMore } from "./inputValidators"

const initV = {
	carBrand: "Honda",
	maxPrice: 10000,
}

export default function ({ submitCb, cancelCb, valueCb, initValue = initV, isEditForm }) {
	const addClass = isEditForm && "disabled"

	const initModels = [
		{
			name: "carBrand",
			type: "select",
			className: addClass,
			options: [
				{ value: "Volvo", description: "Volvo" },
				{ value: "Opel", description: "Opel" },
				{ value: "Toyota", description: "Toyota" },
				{ value: "Audi", description: "Audi" },
				{ value: "Honda", description: "Honda" },
			],
		},
		{
			name: "maxPrice",
			label: "Maximum Price",
			type: "input",
			validators: [
				{ validFun: input => isNumberMore(input, 1500) },
				{ validFun: isInt },
				{ validFun: isNumber },
				{ validFun: isFilled },
			],
		},
		{
			name: "carColor",
			label: "Car color",
			type: "radio",
			options: [
				{ value: "red", name: "Red" },
				{ value: "black", name: "Black" },
				{ value: "white", name: "White" },
				{ value: "yellow", name: "Yellow" },
			],
			validators: [{ validFun: isFilled }],
		},
		{
			name: "description",
			type: "textarea",
			placeholder: "Description",
			rows: 2,
			validators: [{ parseFun: text => isLengthLess(text, 2000) }, { validFun: isFilled }],
		},
		{
			name: "rememberInfo",
			label: "Remember this info",
			type: "checkbox",
			className: "",
			validators: [],
		},
	]

	return (
		<div>
			<FormPanel
				initValue={initValue}
				initModels={initModels}
				submitCb={submitCb}
				cancelCb={cancelCb}
				valueCb={valueCb}
				btnCancel={"Cancel"}
				btnSubmit={"Done"}
				//cls="small"
				// firstTag={
				// 	<button type="button" onClick={handleClick} className="myClass">
				// 		{"Get Anything"}
				// 	</button>
				// }
			/>
		</div>
	)
}
