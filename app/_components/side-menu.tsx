import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const SideMenu = () => {
  const { data } = useSession()
  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              {data.user?.image ? (
                <AvatarImage src={data.user?.image} />
              ) : (
                <UserIcon />
              )}
              {/* <AvatarImage src={data.user?.image ?? ""} /> */}
            </Avatar>
            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <Button variant="secondary" size="icon" onClick={() => signOut()}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-5 py-6">
          <div className="flex items-center gap-3">
            <UserIcon />
            <h2 className="font-bold">Olá, faça seu login</h2>
          </div>

          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => signIn("google")}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="secondary" className="w-full justify-start" asChild>
          <Link href="/">
            <HomeIcon className="mr-2" size={18} />
            Inicio
          </Link>
        </Button>

        {data?.user && (
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon className="mr-2" size={18} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
