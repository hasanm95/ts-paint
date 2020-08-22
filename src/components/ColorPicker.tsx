import React from 'react'


interface IProps {
	colors: string[];
	activeColor: string;
	setActiveColor: (activeColor: string) => void;
}


const ColorPicker: React.FC<IProps> = ({ colors = [], activeColor, setActiveColor }) => {
	if (!colors.length) return null
	return (
		<fieldset className="color-picker">
			{colors.map((color, i) => (
				<label key={i}>
					<input
						name="color"
						type="radio"
						value={color}
						checked={activeColor === color}
						onChange={() => setActiveColor(color)}
					/>
					<span style={{ background: color }} />
				</label>
			))}
		</fieldset>
	)
}

export default ColorPicker;