import React from "react"
import preloader from "../../../assets/img/loader.svg"

export default function Preloader() {
	return (
		<div className="preloaderWrap">
			<img src={preloader} alt="preloader" />
		</div>
	)
}
