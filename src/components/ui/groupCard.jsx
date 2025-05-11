import cardIcon from '@/assets/cardIcon.png'
import { Card, CardContent } from '@/components/ui/card'

const GroupCard = ({ title, datasets }) => {
  return (
    <div className="relative w-60 h-64 mx-auto">
      {/* Card with enhanced blurred border effect */}
      <Card
        className="relative w-full h-full flex flex-col items-start justify-start rounded-3xl
        shadow-[0_0_15px_rgba(74,58,255,0.5)] 
        "
      >
        <CardContent className="flex flex-col justify-between items-start w-full h-full px-4 py-2 z-10 hover:text-primary">
          <div className="mb-0">
            <img src={cardIcon} alt="cardicon" className="w-10 h-10" />
          </div>
          <h3 className="text-base font-semibold leading-tight min-h-[36px] flex items-start">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-4">
            {datasets}{' '}
            {datasets === 1 ? 'conjunto de datos' : 'conjuntos de datos'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default GroupCard
