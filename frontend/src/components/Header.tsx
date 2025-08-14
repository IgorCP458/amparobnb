// src/components/Header.tsx

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAuth } from "@/services/AuthContext";

export default function Header() {
  const {user} = useAuth()

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
            <Button variant='outline' className="w-[100px] mx-auto">
              <Link to='/login'>Login</Link>
            </Button>
            <Button variant='outline' className="w-[100px] mx-auto">
              <Link to='/register'>Registre-se</Link>

            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
