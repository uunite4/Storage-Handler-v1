import React, { useState } from 'react'
import { nanoid } from 'nanoid'

export default function Add(props) {
	const typesArray = props.typesList

	const selectOptions = typesArray.map((type) => {
		return (
			<option key={nanoid()} value={type}>
				{type}
			</option>
		)
	})

	return (
		<section className='add-item'>
			<span className='add-item-title'>ADD ITEM</span>
			<section className='add-item-main'>
				<div className='add-item-img-cont'>
					<img src={props.newItemState.img} alt='' />
					<label htmlFor='select-img'>CHANGE IMAGE</label>
					<input
						name='img'
						id='select-img'
						type='file'
						onChange={props.handleChange}
					/>
				</div>
				<form className='add-item-form'>
					<section className='add-item-section'>
						<label htmlFor='add-item-name'>NAME: </label>
						<input
							name='name'
							id='add-item-name'
							type='text'
							value={props.newItemState.name}
							onChange={props.handleChange}
						/>
					</section>

					<section className='add-item-section'>
						<label htmlFor='add-item-name'>TYPE: </label>
						{!props.otherType ? (
							// NOT A DIFFERENT TYPE
							<select
								onChange={props.handleChange}
								name='type'
								value={props.newItemState.type}
							>
								{selectOptions}
								<option value='Other'>Other</option>
							</select>
						) : (
							// A DIFFERENT TYPE
							<input
								name='type'
								id='add-item-name'
								type='text'
								value={props.newItemState.type}
								onChange={props.handleChange}
							/>
						)}
					</section>

					<section className='add-item-section'>
						<label htmlFor='add-item-name'>COUNT: </label>
						<input
							name='count'
							min={1}
							id='add-item-name'
							type='number'
							value={props.newItemState.count}
							onChange={props.handleChange}
						/>
					</section>

					<input onClick={props.submitFunc} type='submit' value='ADD ITEM' />
				</form>
			</section>

			<button onClick={props.backToMain} className='back-btn'>
				CANCEL
			</button>
		</section>
	)
}
