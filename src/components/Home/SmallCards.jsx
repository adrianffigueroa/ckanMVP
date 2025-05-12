const SmallCards = ({ icon: Icon, value, label }) => {
  return (
    <div
      className="group relative gap-4 flex items-center justify-center h-16 w-54 
    rounded-2xl shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white
    text-gray-500
    hover:cursor-pointer hover:bg-primary hover:text-white"
    >
      <Icon
        size={30}
        className="absolute  -translate-x-27 text-white bg-third rounded-full p-1"
      />
      <span className="text-primary font-semibold text-3xl group-hover:text-white">
        {value}
      </span>
      <span>{label}</span>
    </div>
  )
}

export default SmallCards
