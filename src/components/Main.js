import React, { useState } from 'react'
import Item from './Item'

export default function Main(props) {
	const { items } = props

	const ElemItems = items.map((item) => {
		return (
			<Item
				img={item.img}
				name={item.name}
				type={item.type}
				count={item.count}
				key={item.id}
				id={item.id}
				delItem={props.delItem}
				showAction={props.showAction}
			/>
		)
	})

	return (
		<section className='main'>
			<div onClick={props.addItem} className='add-item-card'>
				<span className='add-item-card-plus'>+</span>
				<span className='add-item-card-text'>CLICK TO ADD ITEM</span>
			</div>
			{ElemItems}
		</section>
	)
}
