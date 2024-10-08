"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BarbershopItemProps {
  Barbershop: Barbershop
}

const BarbershopItem = ({ Barbershop }: BarbershopItemProps) => {
  const router = useRouter()

  const handleBookingClick = () => {
    router.push(`/barbershops/${Barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="relative h-[159px] w-full">
          <div className="absolute left-2 top-2 z-50">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5.0</span>
            </Badge>
          </div>

          <Image
            src={Barbershop.imageUrl}
            fill
            className="h-[159px] rounded-2xl"
            style={{ objectFit: "cover" }}
            alt={Barbershop.name}
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="mt-2 overflow-hidden text-ellipsis text-nowrap font-bold">
            {Barbershop.name}
          </h2>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {Barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="mt-3 w-full"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
