import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ variant = 'normal', onSubmit }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full mx-auto'>
      <div className='backdrop-blur-md bg-white/5 border border-[#6C5BA0]/60 rounded-full px-8 py-5 flex items-center gap-4 transition-all focus-within:border-primary-400/80 shadow-lg shadow-primary-900/10'>
        <FontAwesomeIcon
          icon={variant === 'ai' ? faStar : faMagnifyingGlass}
          className='text-white/70'
        />
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={variant === 'ai' ? 'AI에게 물어보세요' : '궁금한 영화나 TV 프로그램을 물어보세요.'}
          className='bg-transparent outline-none text-white w-full placeholder-zinc-400'
        />
      </div>
    </form>
  )
}

export default SearchBar
