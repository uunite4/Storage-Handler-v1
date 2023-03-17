import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import DefaultItems from './DefaultItems'

import Nav from './components/Nav'
import Search from './components/Search'
import Main from './components/Main'
import Add from './components/Add'
import Edit from './components/Edit'

export default function App() {
	const penImg =
		'https://images.unsplash.com/photo-1585997631913-896180ae8acb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

	const [items, setItems] = useState(DefaultItems) // list of all items
	const [shownItems, setShownitems] = useState(items) // list of items that are shown
	const [page, setPage] = useState('Main') // page name
	const [newItem, setNewItem] = useState({
		// add new item object
		img: '',
		name: '',
		type: 'General',
		count: 1,
		id: nanoid(),
	})
	const [itemDiffType, setItemDiffType] = useState(false) // check if the new item's type is a new type or not
	const [actionBtns, setActionBtns] = useState(true) // show action buttons
	const [types, setTypes] = useState(RemoveTypesDuplicates) // list of all types created
	const [typeFilter, setTypeFilter] = useState('All') // the type that is shown to the user
	const [editItem, setEditItem] = useState(null) // edit existing item object
	const [editId, setEditId] = useState('') // current edited item id
	const [search, setSearch] = useState('') // search input

	//EVERY TIME ITEMS IS CHANGED, SHOWD ITEMS AND TYPES SHOULD CHANGE TOO
	useEffect(() => {
		setShownitems(items)
		TypeFilterCheck()
		CheckSearch()
		setTypes(RemoveTypesDuplicates())

		// CHECK FOR ITEMS WITH COUNT 0
	}, [items])

	// CHANGE SHOWN ITEMS WHEN TYPE FILTER OR SEARCH CHANGES
	useEffect(() => {
		CheckSearch()
	}, [search])

	useEffect(() => {
		TypeFilterCheck()
	}, [typeFilter])

	function TypeFilterCheck() {
		if (typeFilter == 'All') {
			setShownitems(items)
		} else {
			setShownitems(
				items.filter((item) => {
					return item.type == typeFilter
				})
			)
		}
	}

	function CheckSearch() {
		if (search.length > 0) {
			let searchRes = []
			items.forEach((item) => {
				if (item.name.startsWith(search)) {
					searchRes.push(item)
				}
			})
			setShownitems(searchRes)
		} else {
			TypeFilterCheck()
		}
	}

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

	//Edit ITEM PAGE FUNCTION
	function EditPage(id) {
		let editedItem
		items.forEach((item) => {
			if (item.id == id) {
				editedItem = item
			}
		})
		setEditItem(editedItem)
		setEditId(id)
		setPage('Edit')
	}

	//ADD NEW ITEM INPUTS FUNCTION
	function AddNewItemInputs(e) {
		const { name, value, type, files } = e.target
		if (type == 'select-one' && value == 'Other') {
			//Handle the type feature thing
			setItemDiffType(true)
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
			setItemDiffType(false)
			BackToMain()
		} else {
			alert('You should have a: name, type and at least one of this new item')
		}
	}

	// EDIT ITEM INPUTS FUNCTION
	function EditItemInputs(e) {
		const { name, value, type, files } = e.target
		if (type == 'select-one' && value == 'Other') {
			//Handle the type feature thing
			setItemDiffType(true)
			setEditItem((prev) => ({ ...prev, type: '' }))
		} else {
			setEditItem((prev) => ({
				...prev,
				[name]: type == 'file' ? URL.createObjectURL(files[0]) : value,
			}))
		}
	}

	// SAVE EDITED ITEM
	function SaveEditedItem(e, id) {
		e.preventDefault()
		if (editItem.name && editItem.type && editItem.count > 0) {
			setItems(
				items.map((item) => {
					if (item.id == id) {
						return editItem
					} else {
						return { ...item }
					}
				})
			)
			setEditItem(null)
			setItemDiffType(false)
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

		// CHECK IF THE ITEM'S COUNT IS 0
		items.forEach((item) => {
			if (item.id == id && item.count == 1) {
				DeleteItem(id)
			}
		})
	}

	// TYPE FILTER ONCHANGE
	function TypeFilterChange(e) {
		const { value } = e.target
		setTypeFilter(value)
	}

	// SEARCH CHANGE
	function SearchChange(e) {
		const { value } = e.target
		setSearch(value)
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
						searchChange={SearchChange}
						searchState={search}
					/>
					<div className='seperator'></div>
					<Main
						showAction={actionBtns}
						delItem={DeleteItem}
						addCount={AddCount}
						subCount={SubCount}
						items={shownItems}
						addItem={AddPage}
						edititem={EditPage}
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
						otherType={itemDiffType}
					/>
				</>
			)}
			{page == 'Edit' && (
				<>
					<Edit
						typesList={types}
						otherType={itemDiffType}
						editItemState={editItem}
						backToMain={BackToMain}
						handleChange={EditItemInputs}
						saveItem={SaveEditedItem}
						test={test}
						id={editId}
					/>
				</>
			)}
		</>
	)
}
