import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import Nav from './components/Nav'
import Search from './components/Search'
import Main from './components/Main'
import Add from './components/Add'

export default function App() {
	const [items, setItems] = useState(DefaultItems())
	const [shownItems, setShownitems] = useState(items)
	const [page, setPage] = useState('Add')

	// GENERATE AN ITEM
	function DefaultItems() {
		let newItems = []
		for (let i = 0; i < 17; i++) {
			newItems.push(CreateNewItem())
		}

		return newItems
	}

	function CreateNewItem() {
		return {
			img: 'https://images.unsplash.com/photo-1585997631913-896180ae8acb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			name: 'pen',
			type: 'office supply',
			count: 10,
			id: nanoid(),
		}
	}

	//BACK TO MAIN PAGE FUNCTION
	function BackToMain() {
		setPage('Main')
	}

	//ADD ITEM PAGE FUNCTION
	function AddPage() {
		setPage('Add')
	}

	return (
		<>
			<Nav backToMain={BackToMain} />
			{page == 'Main' && (
				<>
					<Search />
					<div className='seperator'></div>
					<Main items={shownItems} addItem={AddPage} />
				</>
			)}
			{page == 'Add' && (
				<>
					<Add backToMain={BackToMain} />
				</>
			)}
		</>
	)
}
