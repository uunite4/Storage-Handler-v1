import React from 'react'

export default function Add(props) {
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
						<input
							name='type'
							id='add-item-name'
							type='text'
							value={props.newItemState.type}
							onChange={props.handleChange}
						/>
						{/* ADD FUNCTIONALITY FOR TYPE INPUT:
            the type input should be a dropdown with all
            the types that already exsits, there should be an option
            called "Add New Type" that should open up a new text-type-input
            to create a new type.
          */}
					</section>

					<section className='add-item-section'>
						<label htmlFor='add-item-name'>COUNT: </label>
						<input
							name='count'
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
