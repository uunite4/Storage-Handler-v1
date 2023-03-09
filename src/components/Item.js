import React from 'react'

export default function Item(props) {
	return (
		<div className='item'>
			<div className='item-img'>
				<img src={props.img} alt='' />
				<span className='item-edit-btn'>EDIT</span>
			</div>
			<div className='item-props'>
				<p className='item-name'>
					{props.name} <span className='item-type'> / {props.type}</span>
				</p>
				<p className='item-count'>{props.count}</p>
			</div>
		</div>
	)
}
