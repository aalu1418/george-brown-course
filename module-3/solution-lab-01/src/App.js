import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormTextInput from './components/FormTextInput'
import LoadingScreen from './components/LoadingScreen'
import fetchData from './utils/fetchData'
import getRandomId from './utils/getRandomId'

const LIST_URL =
  'https://gist.githubusercontent.com/amsul/3b6edcbb9bbc42b231089b6ebad38cb9/raw/6cfee9781998199548f579d0082f3d3a05f20321/data.json'

function getLocalListItems() {
  const storedListItems = window.localStorage.getItem('to-do:list')
  if (!storedListItems) {
    return null
  }
  return JSON.parse(storedListItems)
}

export default function App() {
  const [newItem, setNewItem] = React.useState('')
  const [listItems, setListItems] = React.useState(getLocalListItems)

  React.useEffect(() => {
    if (window.localStorage.getItem('to-do:list') != null) {
      return
    }
    fetchData(LIST_URL).then(result => setListItems(result))
  }, [])

  React.useEffect(() => {
    if (listItems == null) {
      window.localStorage.removeItem('to-do:list')
    } else {
      window.localStorage.setItem('to-do:list', JSON.stringify(listItems))
    }
  }, [listItems])

  if (listItems == null) {
    return <LoadingScreen label='Loading your to-do list' />
  }

  const newItemTrimmed = newItem.trim()
  const addNewItem = () => {
    if (!newItemTrimmed) {
      return
    }
    setListItems([
      ...listItems,
      {
        id: getRandomId(),
        label: newItemTrimmed,
      },
    ])
    setNewItem('')
  }

  const onKeyPressInput = event => {
    if (event.charCode === 13) {
      addNewItem()
    }
  }

  const toggleCompleteListItem = itemId => {
    const itemIndex = listItems.findIndex(item => item.id === itemId)
    if (itemIndex < 0) {
      return
    }
    const item = listItems[itemIndex]
    const updatedItem = {
      ...item,
      completed: !item.completed,
    }
    setListItems([
      ...listItems.slice(0, itemIndex),
      updatedItem,
      ...listItems.slice(itemIndex + 1),
    ])
  }

  const deleteListItem = itemId => {
    const itemIndex = listItems.findIndex(item => item.id === itemId)
    if (itemIndex < 0) {
      return
    }
    setListItems([
      ...listItems.slice(0, itemIndex),
      ...listItems.slice(itemIndex + 1),
    ])
  }

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>To-Do List</FormTitle>

          {/* Put your solution here 👇 */}

          <div>
            {listItems.map(item => (
              <ChecklistItem
                key={item.id}
                label={item.label}
                isChecked={item.completed}
                onToggleComplete={() => toggleCompleteListItem(item.id)}
                onClickDelete={() => deleteListItem(item.id)}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, marginRight: 10 }}>
              <FormTextInput
                placeholder='Enter a new to-do item'
                value={newItem}
                setValue={setNewItem}
                rows={1}
                onKeyPress={onKeyPressInput}
              />
            </div>
            <button
              onClick={() => addNewItem()}
              disabled={!newItemTrimmed.length}
              style={{
                font: 'inherit',
                fontSize: 13,
                fontWeight: 'bold',
                background: newItemTrimmed.length ? '#0069ce' : '#eee',
                color: newItemTrimmed.length ? '#fff' : '#bbb',
                border: 0,
                borderRadius: 15,
                height: 30,
                padding: 0,
                paddingLeft: 18,
                paddingRight: 18,
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChecklistItem({ label, isChecked, onToggleComplete, onClickDelete }) {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
      }}
    >
      <label
        style={{
          flex: 1,
          textDecoration: isChecked ? 'line-through' : undefined,
        }}
      >
        <input
          type='checkbox'
          checked={isChecked}
          onChange={onToggleComplete}
        />
        <span>{label}</span>
      </label>
      <button
        style={{
          marginLeft: 40,
          background: '#eee',
          color: '#444',
          border: 0,
          borderRadius: 10,
          height: 20,
          padding: 0,
          paddingLeft: 10,
          paddingRight: 10,
          font: 'inherit',
          fontSize: 12,
        }}
        onClick={onClickDelete}
      >
        Delete
      </button>
    </div>
  )
}
