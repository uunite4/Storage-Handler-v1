import React from 'react'

export default function Add(props) {
	return (
		<section className='add-item'>
			<span className='add-item-title'>ADD ITEM</span>
			<section className='add-item-main'>
				<div className='add-item-img-cont'>
					<img
						src='https://images.unsplash.com/photo-1585997631913-896180ae8acb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
						alt=''
					/>
					<label htmlFor='select-img'>CHANGE IMAGE</label>
					<input id='select-img' type='file' />
				</div>
				<form className='add-item-form'>
					<section className='add-item-section'>
						<label htmlFor='add-item-name'>NAME: </label>
						<input id='add-item-name' type='text' />
					</section>

					<section className='add-item-section'>
						<label htmlFor='add-item-name'>TYPE: </label>
						<input id='add-item-name' type='text' />
						{/* ADD FUNCTIONALITY FOR TYPE INPUT:
            the type input should be a dropdown with all
            the types that already exsits, there should be an option
            called "Add New Type" that should open up a new text-type-input
            to create a new type.
          */}
					</section>

					<section className='add-item-section'>
						<label htmlFor='add-item-name'>COUNT: </label>
						<input id='add-item-name' type='number' />
					</section>

					<input type='submit' value='ADD ITEM' />
				</form>
			</section>

			<button onClick={props.backToMain} className='back-btn'>
				CANCEL
			</button>
		</section>
	)
}
