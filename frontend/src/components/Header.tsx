// src/components/Header.tsx

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAuth } from "@/services/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  async function handleLogout() {
    logout()
    navigate('/')
  }

  if(user) {
    return (
      <header className="w-full bg-background shadow-xl shadow-black-500/50 relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/src/assets/airbnb.png" alt="Logo AmparoBnB" className="w-20" />
        </Link>

        {/* Menu simples */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-red-400">Início</Link>
          <Link to="/" className="hover:text-red-400">Explorar</Link>
          <Link to="/about" className="hover:text-red-400">Sobre</Link>
        </nav>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full bg-accent text-white cursor-pointer justify-between px-4 hover:bg-neutral-900 min-w-24">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {user.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="grid grid-rows-2 space-y-2 rounded-xl w-[150px]">
            <Link to='/account' className="mx-auto">
              <Button variant='outline' className="w-[100px] mx-auto cursor-pointer">
                Minha conta
              </Button>
            </Link>
            <Link to='/' className="mx-auto">
              <Button variant='outline' className="w-[100px] mx-auto cursor-pointer" onClick={handleLogout}>
                Sair
              </Button>
            </Link>
          </PopoverContent>
        </Popover>

      </div>
    </header>
    )
  }

  return (
    <header className="w-full bg-background shadow-xl shadow-black-500/50 relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/src/assets/airbnb.png" alt="Logo AmparoBnB" className="w-20" />
        </Link>

        {/* Menu simples */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-red-400">Início</Link>
          <Link to="/" className="hover:text-red-400">Explorar</Link>
          <Link to="/about" className="hover:text-red-400">Sobre</Link>
        </nav>

        {/* Botão de ação */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white cursor-pointer">Entrar</Button>
          </PopoverTrigger>
          <PopoverContent className="grid grid-rows-2 space-y-2 rounded-xl w-[150px]">
            <Link to='/login' className="mx-auto">
              <Button variant='outline' className="w-[100px] mx-auto">
                Login
              </Button>
            </Link>
            <Link to='/register' className="mx-auto">
              <Button variant='outline' className="w-[100px] mx-auto">
                Registre-se
              </Button>
            </Link>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
