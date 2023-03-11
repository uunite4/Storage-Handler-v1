import React from 'react'

export default function Item(props) {
	return (
		<div className='item'>
			<div className='item-img'>
				<img src={props.img} alt='' />
				{props.showAction && (
					<>
						<span className='item-action item-edit-btn'>EDIT</span>
						<span
							onClick={() => props.delItem(props.id)}
							className='item-action item-dele-btn'
						>
							DELETE
						</span>
						<span className='item-action item-plus-btn'>+1</span>
						<span className='item-action item-minus-btn'>-1</span>
					</>
				)}
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
