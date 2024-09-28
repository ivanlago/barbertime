"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {
  const { data } = useSession()

  const handleLoginClick = async () => {
    await signIn()
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logo.png"
          alt="logo of Barbertime"
          height={22}
          width={120}
        />

        {data?.user ? (
          <div>
            <h1>{data.user.name}</h1>
            <Button onClick={handleLogoutClick}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}

        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
