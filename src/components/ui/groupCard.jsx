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
const GroupCard = ({ title, datasets, group }) => {
  console.log(title, datasets)
  console.log(group)

  return (
    <div className="relative w-60 h-64 mx-auto">
      {/* Card with enhanced blurred border effect */}
      <Card className="card-custom bg-body rounded-[40px] w-full h-10/11 flex flex-col items-center justify-start">
        <CardContent className="flex flex-col justify-between items-start w-full h-full px-4 py-2 z-10 hover:text-primary">
          {/* Contenedor superior con ícono, título y descripción */}
          <div className="flex flex-col items-start justify-start min-h-[96px] gap-1">
            {getGroupIcon(title)}

            <h3 className="text-base font-semibold leading-tight mt-2">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground leading-snug text-left">
              {group.description}
            </p>
          </div>

          {/* Conjuntos de datos */}
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
