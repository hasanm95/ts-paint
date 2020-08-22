import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './WindowSize'


interface IProps {
	color: string;
	width: number;
	height: number;
	handleMouseMove?: (x: number, y: number) => void;
}

const Canvas: React.FC<IProps> = (props) => {
	const [drawing, setDrawing] = useState(false)
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
	const ctx = useRef() as React.MutableRefObject<CanvasRenderingContext2D | null>
	

	useEffect(() => {
		ctx.current = canvasRef?.current?.getContext('2d');
	}, [])

	useWindowSize(() => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	})

	function handleMouseMove(e: React.MouseEvent) {
		// actual coordinates
		const coords: [number, number] = [
			e.clientX - canvasRef?.current?.offsetLeft,
			e.clientY - canvasRef?.current?.offsetTop
		]
		if (drawing) {
			ctx?.current?.lineTo(...coords)
			ctx?.current?.stroke()
		}
		if (props.handleMouseMove) {
			props.handleMouseMove(...coords)
		}
	}
	function startDrawing(e: React.MouseEvent) {
		if(!ctx.current) return;
		ctx.current.lineJoin = 'round'
		ctx.current.lineCap = 'round'
		ctx.current.lineWidth = 10
		ctx.current.strokeStyle = props.color
		ctx?.current?.beginPath();
		// actual coordinates
		ctx?.current?.moveTo(
			e?.clientX - canvasRef?.current?.offsetLeft,
			e?.clientY - canvasRef?.current?.offsetTop
		)
		setDrawing(true)
	}
	function stopDrawing() {
		if(!ctx.current) return;
		ctx.current.closePath()
		setDrawing(false)
	}

	return <canvas
		ref={canvasRef}
		width={props.width || width}
		height={props.height || height}
		onMouseDown={startDrawing}
		onMouseUp={stopDrawing}
		onMouseOut={stopDrawing}
		onMouseMove={handleMouseMove}
	/>
}

export default Canvas;