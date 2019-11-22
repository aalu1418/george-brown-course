import './App.css'
import React from 'react'

export default function App() {
  const [isNarrow, setIsNarrow] = React.useState(window.innerWidth <= 600)

  React.useEffect(() => {
    const onResize = () => {
      if (!isNarrow && window.innerWidth <= 600) {
        setIsNarrow(true)
      } else if (isNarrow && window.innerWidth > 600) {
        setIsNarrow(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [isNarrow])

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Feedback Form</h1>

        {!isNarrow && (
          <div>
            <h3 className='App-SubTitle'>
              Give a rating based on your experience
            </h3>
            <ScalesSection />
          </div>
        )}

        <h3 className='App-SubTitle'>
          Select all options based on your experience
        </h3>
        <CheckboxesSection />
      </div>
    </div>
  )
}

function ScalesSection() {
  const [rating, setRating] = React.useState({
    food: 0,
    pool: 0,
    beds: 0,
    showers: 0,
  })

  const onChangeItem = event =>
    setRating({
      ...rating,
      [event.target.name]: Number(event.target.value),
    })

  const totalRating = Object.keys(rating).reduce(
    (accumulator, key) => accumulator + rating[key],
    0,
  )
  const averageRating = totalRating / 4

  return (
    <div>
      <ScaleItem onChange={onChangeItem} name='food' text='Food' />
      <ScaleItem onChange={onChangeItem} name='pool' text='Pool' />
      <ScaleItem onChange={onChangeItem} name='beds' text='Beds' />
      <ScaleItem onChange={onChangeItem} name='showers' text='Showers' />
      <p>Average rating: {averageRating}</p>
    </div>
  )
}

function ScaleItem({ onChange, name, text }) {
  return (
    <div className='ScaleItem'>
      <div className='ScaleItem-Text'>{text}</div>
      <ScaleItemInput onChange={onChange} name={name} value={1} />
      <ScaleItemInput onChange={onChange} name={name} value={2} />
      <ScaleItemInput onChange={onChange} name={name} value={3} />
      <ScaleItemInput onChange={onChange} name={name} value={4} />
      <ScaleItemInput onChange={onChange} name={name} value={5} />
    </div>
  )
}

function ScaleItemInput({ onChange, name, value }) {
  return (
    <label className='ScaleItemInput'>
      <input type='radio' name={name} value={value} onChange={onChange} />
      <div className='ScaleItemInput-Text'>{value}</div>
    </label>
  )
}

function CheckboxesSection() {
  // const [remainingCount, setRemainingCount] = React.useState(0)
  const [checkedItems, setCheckedItems] = React.useState({
    enjoy: false,
    return: false,
    recommend: false,
  })

  const onChangeItem = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    })
  }

  const checkedKeys = Object.keys(checkedItems)
  const remainingCount =
    checkedKeys.length - checkedKeys.filter(key => checkedItems[key]).length

  return (
    <div>
      <CheckboxItem
        isChecked={checkedItems.enjoy}
        name='enjoy'
        onChange={onChangeItem}
        text='Did you enjoy your stay?'
      />
      <CheckboxItem
        isChecked={checkedItems.return}
        name='return'
        onChange={onChangeItem}
        text='Will you consider returning again?'
      />
      <CheckboxItem
        isChecked={checkedItems.recommend}
        name='recommend'
        onChange={onChangeItem}
        text='Would you recommend our service?'
      />
      <p>Total remaining: {remainingCount}</p>
    </div>
  )
}

function CheckboxItem({ isChecked, name, onChange, text }) {
  let className = 'CheckboxItem'
  if (isChecked) {
    className += ' CheckboxItem__Checked'
  }

  return (
    <label className={className}>
      <input
        name={name}
        type='checkbox'
        className='CheckboxItem-Input'
        onChange={onChange}
      />
      <span className='CheckboxItem-Text'>{text}</span>
    </label>
  )
}
