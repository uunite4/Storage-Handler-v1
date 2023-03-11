import React from 'react'

export default function Nav(props) {
	return (
		<nav>
			<div className='nav-logo-cont'>
				<p onClick={props.backToMain} className='title'>
					STORAGE HANDLER
				</p>
			</div>
			<div className='action-toggle-cont'>
				<div onClick={props.toggleAction} className='action-toggle'>
					<div
						className={`action-toggle-handle ${
							props.showAction ? 'on' : 'off'
						}`}
					></div>
				</div>
			</div>
		</nav>
	)
}
