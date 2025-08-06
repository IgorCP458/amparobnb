import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from 'react'

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(40, "A senha deve ter no máximo 40 caracteres")
})



export default function LoginCard() {

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email")
      const password = formData.get("password")
      const result = loginSchema.safeParse({email, password})
      if(!result.success) {
        console.log(result.error)

      } else {
        
      }
    } catch (error) {
      
    }
    
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Faça Log-in na sua conta</CardTitle>
        <CardDescription>
          Coloque o email e senhas da sua conta
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant="link">Registre-se</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              name='email'
              placeholder="exemplo@exemplo.com"
              required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <Input 
              id="password" 
              type="password" 
              name='password'
              required />
          </div>
        </div>
        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full">Login</Button>
        </CardFooter>
      </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
      </CardFooter>
    </Card>
  )
}
