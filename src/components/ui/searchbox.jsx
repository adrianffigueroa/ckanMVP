import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({
  searchTerm,
  setSearchTerm,
  isHomePage,
  wrapperClassName = 'w-3/4',
}) {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState(searchTerm || '')

  const handleSubmit = () => {
    setSearchTerm(inputValue.trim())
    isHomePage && navigate('/datasets')
    if (inputValue.trim() !== '') {
      navigate(`/datasets?search=${encodeURIComponent(inputValue.trim())}`)
    } else {
      navigate('/datasets')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className={`${wrapperClassName} p-[2px] rounded-xl shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white`}
    >
      <div className="flex items-center rounded-lg px-4 py-2 bg-white">
        <Input
          type="text"
          placeholder={'Buscar...'}
          className="border-none h-8 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700 placeholder:text-gray-400"
          value={inputValue ? inputValue : searchTerm}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          size=""
          className="ml-2 rounded-full bg-[rgb(74,58,255)] hover:bg-primary-hover text-white cursor-pointer"
          onClick={handleSubmit}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
