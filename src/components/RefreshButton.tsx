import React, {memo, FunctionComponent} from 'react'


interface IProps {
	cb: Function
}

const RefreshButton: FunctionComponent<IProps> = ({cb}) => (
	<button className="button-refresh-colors" onClick={() => cb()}>&#8634;</button>
);

export default memo(RefreshButton);