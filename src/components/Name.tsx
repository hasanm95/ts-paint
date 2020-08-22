import React, { useState, memo } from "react";


type HTMLElementEvent<T extends HTMLElement> = Event & {
	target: T; 
}

const Name: React.FC = () => {
	const [name, setName] = useState<string>("");

	const clickHandler = (e: HTMLElementEvent<HTMLInputElement>): void => {
		e.target.setSelectionRange(0, e.target.value.length)
	}

	return (
		<label className="header-name">
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				onClick={clickHandler as any}
				placeholder="Untitled"
			/>
		</label>
	);
}

export default memo(Name)