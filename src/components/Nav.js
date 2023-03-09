import React from 'react'

export default function Nav(props) {
	return (
		<nav>
			<div className='nav-logo-cont'>
				<p onClick={props.backToMain} className='title'>
					STORAGE HANDLER
				</p>
			</div>
		</nav>
	)
}
