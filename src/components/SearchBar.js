import React from 'react'

function SearchBar({ value, changeInput }) {
  return (
    <div className='searchBar-wrap'>
        <input className='searchBar-icon form-control'
          type='text'
          placeholder='Search Title'
          value={value}
          onChange={changeInput}
        />
    </div>
  )
}

export default SearchBar