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
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

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
    <div className="bg-violet-100 p-2 rounded-md flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
  )
}
const GruposCards = ({ group }) => {
  return (
    <div>
      <Card className="h-70 w-full flex flex-col justify-between p-4 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.08)] bg-white">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            {getGroupIcon(group?.grupo)}
            <CardTitle className="text-base font-semibold leading-tight">
              {group?.grupo?.charAt(0).toUpperCase() + group?.grupo?.slice(1)}
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-gray-500 mt-2">
            {group?.descripcion}
          </CardDescription>
        </CardHeader>

        <div className="flex justify-center p-0">
          <Button
            variant="outline"
            className="w-full text-primary border-primary text-xs rounded-2xl h-6 hover:cursor-pointer hover:bg-primary-hover hover:text-white"
          >
            Ver Datasets
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default GruposCards
