import { toTitleCase } from '@/utils/toTitleCase'
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
import { Link } from 'react-router-dom'
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
  console.log(group)

  return (
    <div>
      <Card className="h-60 w-full flex flex-col justify-between p-4 rounded-md shadow-theme-light bg-white">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            {getGroupIcon(group?.name)}
            <CardTitle className="text-base font-semibold leading-tight customColor1">
              {toTitleCase(group?.name)}
            </CardTitle>
          </div>
          <CardDescription className="text-sm customColor2 mt-2 line-clamp-5">
            {group?.description}
          </CardDescription>
        </CardHeader>

        <div className="flex justify-center p-0">
          <Button
            asChild
            className="bg-primary button-custom text-white text-sm px-4 py-2 rounded-xl hover:cursor-pointer"
          >
            <Link to={`/datasets?group=${group.name}`}>Ver Datasets</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default GruposCards
