import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import DefaultItems from './DefaultItems'

import Nav from './components/Nav'
import Search from './components/Search'
import Main from './components/Main'
import Add from './components/Add'

export default function App() {
	const penImg =
		'https://images.unsplash.com/photo-1585997631913-896180ae8acb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

	const [items, setItems] = useState(DefaultItems)
	const [shownItems, setShownitems] = useState(items)
	const [page, setPage] = useState('Main')
	const [newItem, setNewItem] = useState({
		img: '',
		name: '',
		type: 'General',
		count: 1,
		id: nanoid(),
	})
	const [newItemDiffType, setNewItemDiffType] = useState(false)
	const [actionBtns, setActionBtns] = useState(true)
	const [types, setTypes] = useState(RemoveTypesDuplicates)
	const [typeFilter, setTypeFilter] = useState('All')

	//EVERY TIME items IS CHANGED, SHOWD ITEMS AND TYPES SHOULD CHANGE TOO
	useEffect(() => {
		setShownitems(items)
		setTypes(RemoveTypesDuplicates())
	}, [items])

	useEffect(() => {
		if (typeFilter == 'All') {
			setShownitems(items)
		} else {
			setShownitems(
				items.filter((item) => {
					return item.type == typeFilter
				})
			)
		}
	}, [typeFilter])

	// TYPES FUNCTIONS
	function GetAllTypes() {
		return items.map((item) => {
			return item.type
		})
	}

	function RemoveTypesDuplicates() {
		let mainTypes = GetAllTypes()
		mainTypes.unshift('General')
		let newArr = mainTypes.filter(
			(type, index) => mainTypes.indexOf(type) === index
		)
		return newArr
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
		if (type == 'select-one' && value == 'Other') {
			//Handle the type feature thing
			setNewItemDiffType(true)
			setNewItem((prev) => ({ ...prev, type: '' }))
		} else {
			setNewItem((prev) => ({
				...prev,
				[name]: type == 'file' ? URL.createObjectURL(files[0]) : value,
			}))
		}
	}

	// ACTUALLY ADD NEW ITEM TO LIST
	function SubmitNewItem(e) {
		e.preventDefault()
		if (newItem.name && newItem.type && newItem.count > 0) {
			setItems((prev) => [newItem, ...prev])
			setNewItem({ img: '', name: '', type: 'General', count: 1, id: nanoid() })
			setNewItemDiffType(false)
			BackToMain()
		} else {
			alert('You should have a: name, type and at least one of this new item')
		}
	}

	// TOGGLE ACTION BUTTONS
	function ToggleActionBtns() {
		setActionBtns((prev) => !prev)
	}

	// DELETE ITEM
	function DeleteItem(id) {
		setItems((prev) => prev.filter((item) => item.id !== id))
	}

	// ADD +1 COUNT
	function AddCount(id) {
		setItems((prev) => {
			return prev.map((item) => {
				return item.id === id ? { ...item, count: item.count + 1 } : { ...item }
			})
		})
	}

	// SUBTRACT 1 COUNT
	function SubCount(id) {
		setItems((prev) => {
			return prev.map((item) => {
				return item.id === id ? { ...item, count: item.count - 1 } : { ...item }
			})
		})
	}

	// TYPE FILTER ONCHANGE
	function TypeFilterChange(e) {
		const { value } = e.target
		setTypeFilter(value)
	}

	return (
		<>
			<Nav
				toggleAction={ToggleActionBtns}
				backToMain={BackToMain}
				showAction={actionBtns}
			/>
			{page == 'Main' && (
				<>
					<Search
						typeFilterState={typeFilter}
						typeFilerChange={TypeFilterChange}
						types={types}
					/>
					<div className='seperator'></div>
					<Main
						showAction={actionBtns}
						delItem={DeleteItem}
						addCount={AddCount}
						subCount={SubCount}
						items={shownItems}
						addItem={AddPage}
					/>
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
						typesList={types}
						otherType={newItemDiffType}
					/>
				</>
			)}
		</>
	)
}
