import { useState, useEffect } from 'react'


type Callback = () => void;

const useWindowSize = (cb: Callback) => {
	const [[windowWidth, windowHeight], setWindowSize] = useState<number[]>([window.innerWidth, window.innerHeight])

	useEffect(() => {
		const handleResize = () => {
			cb()
			setWindowSize([window.innerWidth, window.innerHeight])
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return [windowWidth, windowHeight]
}

export default useWindowSize;