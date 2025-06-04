import React from 'react'

const SmallCards = ({ icon: Icon, value, label, isLoading, isError }) => {
  let displayValue = value

  if (isError) displayValue = 'Error'
  else if (typeof value === 'object' && !React.isValidElement(value)) {
    displayValue = Array.isArray(value) ? value.length : '?'
  }

  return (
    <div
      className="group relative gap-4 flex items-center justify-center h-16 w-54 
    rounded-2xl shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white
    text-gray-500
    hover:cursor-pointer hover:bg-primary customColor1Hover"
    >
      <Icon
        size={30}
        className="absolute -translate-x-27 text-white bg-third rounded-full p-1"
      />
      <div className="flex items-center justify-between w-full  px-6 md:px-8">
        <span className="text-primary font-semibold text-3xl group-hover:text-white text-left">
          {displayValue}
        </span>
        <span className="text-right text-md">{label}</span>
      </div>
    </div>
  )
}

export default SmallCards
