import { MenuIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Avatar from '../../public/avatar.png'
import Image from 'next/image'

const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center  gap-x-3 ">
        <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
        <Image src={Avatar} alt="avatar" className="w-9" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] mt-3">
        <DropdownMenuItem>Login</DropdownMenuItem>
        <DropdownMenuItem>Register</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserNav
