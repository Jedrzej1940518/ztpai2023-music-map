import React, { useState } from 'react'
import './Genre.css'

const Genre = ({ genreName, onGenreChange }) => {
  const [isChecked, setChecked] = useState(
    genreName === 'Favorites' ? false : true
  )

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked
    setChecked(newCheckedState)
    onGenreChange(genreName, newCheckedState)
  }

  return (
    <div className={`genre-container ${isChecked ? 'checked' : ''}`}>
      <span>{genreName}</span>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  )
}

export default Genre
