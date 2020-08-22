import React, { useState, useEffect, useCallback, useRef } from 'react'
import randomColor from 'randomcolor'
import Name from './Name'
import Canvas from './Canvas'
import ColorPicker from './ColorPicker'
import RefreshButton from './RefreshButton'
import useWindowSize from './WindowSize'

interface IColorHex {
	value: string;
	clean: string;
}

interface IColor {
	hex: {
		[key: string]: IColorHex
	}
}

const Paint: React.FC = () => {
	const [colors, setColors] = useState<string[]>([])
	const [activeColor, setActiveColor] = useState<string>('');

	const getColors = useCallback(() => {
		const baseColor = randomColor().slice(1);
		fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
			.then(res => res.json())
			.then(res => {
				setColors(res.colors.map((color: IColor) => color.hex.value))
				setActiveColor(res.colors[0].hex.value)
			})
	}, [])
	useEffect(getColors, [])

	const [visible, setVisible] = useState<boolean>(false)
	let timeoutId = useRef() as React.MutableRefObject<number | undefined>
	const [windowWidth, windowHeight] = useWindowSize(() => {
		setVisible(true)
		clearTimeout(timeoutId.current)
		timeoutId.current = window.setTimeout(() => setVisible(false), 500);
	})

	return (
		<div className="app">
			<header style={{ borderTop: `10px solid ${activeColor}` }}>
				<div>
					<Name />
				</div>
				<div style={{ marginTop: 10 }}>
					<ColorPicker
						colors={colors}
						activeColor={activeColor}
						setActiveColor={setActiveColor}
					/>
					<RefreshButton cb={getColors} />
				</div>
			</header>
			{activeColor && (
				<Canvas
					color={activeColor}
					height={windowHeight}
					width={windowWidth}
				/>
			)}
			<div className={`window-size ${visible ? '' : 'hidden'}`}>
				{windowWidth} x {windowHeight}
			</div>
		</div>
	)
}

export default Paint;