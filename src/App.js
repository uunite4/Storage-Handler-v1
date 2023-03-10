import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Nav from './components/Nav'
import Search from './components/Search'
import Main from './components/Main'
import Add from './components/Add'

export default function App() {
	const penImg =
		'https://images.unsplash.com/photo-1585997631913-896180ae8acb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

	const [items, setItems] = useState(DefaultItems())
	const [shownItems, setShownitems] = useState(items)
	const [page, setPage] = useState('Main')
	const [newItem, setNewItem] = useState({
		img: '',
		name: '',
		type: '',
		count: 0,
	})

	//EVERY TIME items IS CHANGED, SHOWD ITEMS SHOULD CHANGE TOO
	useEffect(() => {
		setShownitems(items)
	}, [items])

	// GENERATE AN ITEM
	function DefaultItems() {
		let newItems = []
		for (let i = 0; i < 2; i++) {
			newItems.push(CreateNewItem())
		}

		return newItems
	}

	function CreateNewItem() {
		return {
			img: penImg,
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

	//ADD NEW ITEM INPUTS FUNCTION
	function AddNewItemInputs(e) {
		const { name, value, type, files } = e.target
		setNewItem((prev) => ({
			...prev,
			[name]: type == 'file' ? URL.createObjectURL(files[0]) : value,
		}))
	}

	// ACTUALLY ADD NEW ITEM TO LIST
	function SubmitNewItem(e) {
		e.preventDefault()
		if (newItem.name && newItem.type && newItem.count > 0) {
			setItems((prev) => [newItem, ...prev])
			setNewItem({ img: '', name: '', type: '', count: 0 })
			BackToMain()
		} else {
			alert('You should have a: name, type and at least one of this new item')
		}
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
					<Add
						backToMain={BackToMain}
						handleChange={AddNewItemInputs}
						newItemState={newItem}
						defPenImg={penImg}
						submitFunc={SubmitNewItem}
					/>
				</>
			)}
		</>
	)
}
