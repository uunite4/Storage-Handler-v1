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
			<span className='add-item-title'>EDIT ITEM</span>
			<section className='add-item-main'>
				<div className='add-item-img-cont'>
					<img src={props.editItemState.img} alt='' />
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
							value={props.editItemState.name}
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
								value={props.editItemState.type}
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
								value={props.editItemState.type}
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
							value={props.editItemState.count}
							onChange={props.handleChange}
						/>
					</section>

					<input
						onClick={(e) => props.saveItem(e, props.id)}
						type='submit'
						value='SAVE ITEM'
					/>
				</form>
			</section>

			<button onClick={props.backToMain} className='back-btn'>
				CANCEL
			</button>
		</section>
	)
}
