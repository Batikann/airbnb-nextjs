import { MenuIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Avatar from '../../public/default.jpg'
import Image from 'next/image'
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { Button } from '../ui/button'

const UserNav = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center  lg:gap-x-3 ">
        <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
        {user?.picture ? (
          <div className="rounded-full">
            <Image
              src={user.picture}
              alt="avatar"
              className="w-9 h-9 hidden lg:block rounded-full"
              width={36}
              height={36}
            />
          </div>
        ) : (
          <Image
            src={Avatar}
            alt="avatar"
            className="w-9 h-9 hidden lg:block"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] mt-3">
        {user ? (
          <>
            <DropdownMenuItem>
              <form className="px-0 w-full">
                <Button className="px-0  text-start" variant={'ghost'}>
                  Airbnb your Home
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-homes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/reservations" className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LoginLink>Login</LoginLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RegisterLink>Register</RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserNav
