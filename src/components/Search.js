import React from 'react'
import { nanoid } from 'nanoid'

export default function Search(props) {
	const typeList = props.types

	const typeOptions = typeList.map((type) => {
		return (
			<option key={nanoid()} value={type}>
				{type}
			</option>
		)
	})

	return (
		<section className='search'>
			<div className='search-cont'>
				<button className='search-btn'></button>
				<input
					onChange={props.searchChange}
					className='search-input'
					type='text'
					value={props.searchState}
				/>
			</div>
			<div className='filters-cont-wrapper'>
				<h1 className='filters-title'>FILTERS</h1>
				<div className='filters-cont'>
					{/* FILTER BY TYPE */}
					<div className='types-filter'>
						<label htmlFor='type-filter'>Filter By Type: </label>
						<select
							onChange={props.typeFilerChange}
							value={props.typeFilterState}
							name='type-filter'
							id='type-filter'
						>
							<option value='All'>All</option>
							{typeOptions}
						</select>
					</div>
					{/* FILTER BY TYPE */}
				</div>
			</div>
		</section>
	)
}
