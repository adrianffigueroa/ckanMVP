import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../ui/card'

export default function LoginForm() {
  return (
    <section className="mt-40 flex justify-center w-full relative mb-10">
      <div className="absolute inset-0">
        <div className="w-[115%] mt-25 h-full translate-x-[9%] bg-[rgba(74,58,255,0.03)] rounded-t-[150px]"></div>
      </div>
      <Card className="w-200 max-w-md h-100 p-6 mx-auto mt-5 shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white rounded-t-2xl z-1">
        <CardHeader className="w-full flex flex-col items-start ">
          <h2 className="text-2xl font-semibold text-primary text-center mb-6">
            Iniciar Sesión en Sitio Web de Administrador
          </h2>
        </CardHeader>
        <CardContent className="w-full text-center ">
          <Link to="https://facilities-western-throughout-cement.trycloudflare.com/user/login">
            <Button className="hover:cursor-pointer hover:bg-primary-hover">
              Iniciar Sesión
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
