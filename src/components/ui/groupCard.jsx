//import cardIcon from '@/assets/cardIcon.png'
import { Card, CardContent } from '@/components/ui/card'
import {
  Atom,
  Banknote,
  Briefcase,
  Building2,
  Bus,
  Dumbbell,
  Globe,
  GraduationCap,
  HeartPulse,
  Palette,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react'
const getGroupIcon = (groupName) => {
  const icons = {
    ciencia: Atom,
    educación: GraduationCap,
    empleo: Briefcase,
    geografía: Globe,
    salud: HeartPulse,
    ciudadanía: Users,
    seguridad: Shield,
    economía: Banknote,
    infraestructura: Bus,
    cultura: Palette,
    deporte: Dumbbell,
    demografía: UserCheck,
    urbanismo: Building2,
  }

  const Icon = icons[groupName?.toLowerCase()] || Globe
  return (
    <div className="bg-white p-2 rounded-md flex items-center justify-center">
      <Icon className="w-7 h-7 text-primary" />
    </div>
  )
}
const GroupCard = ({ title, datasets }) => {
  return (
    <div className="relative w-60 h-64 mx-auto">
      {/* Card with enhanced blurred border effect */}
      <Card
        className="relative w-full h-10/11 flex flex-col items-center justify-start rounded-[40px]
  shadow-[0_0_25px_0_rgba(74,58,255,0.25)] bg-body hover:shadow-[0_0_20px_0_rgba(74,58,255,0.5)] hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <CardContent className="flex flex-col justify-between items-start w-full h-full px-4 py-2 z-10 hover:text-primary">
          <div className="mb-0">{getGroupIcon(title)}</div>
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
