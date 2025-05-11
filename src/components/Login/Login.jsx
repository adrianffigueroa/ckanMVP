import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader } from '../ui/card'

// Validación con Zod
const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    console.log('Datos enviados:', data)
    // Acá hacés el login con fetch, axios, etc.
  }

  return (
    <section className="mt-40 flex justify-center w-full relative mb-10">
      <div className="absolute inset-0">
        <div className="w-[115%] mt-25 h-full translate-x-[9%] bg-[rgba(74,58,255,0.03)] rounded-t-[150px]"></div>
      </div>
      <Card className="w-200 max-w-md h-100 p-6 mx-auto mt-5 shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white rounded-t-2xl z-1">
        <CardHeader className="w-full flex flex-col items-start ">
          <h2 className="text-2xl font-semibold text-primary text-center mb-6">
            Iniciar sesión
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-md w-full"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="ejemplo@correo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contraseña */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-8">
                Login
              </Button>
            </form>
          </Form>
        </CardHeader>
      </Card>
    </section>
  )
}
