"use client"

import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"
import { Barbershop, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale/pt-BR"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { generateDayTimeList } from "../_helpers/hours"
import { format } from "date-fns"

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated?: boolean
}

const ServiceItem = ({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemProps) => {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<string | undefined>()

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google")
    }
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  return (
    <Card>
      <CardContent className="w-full p-3">
        <div className="flex w-full items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          <div className="flex w-full flex-col">
            <h1 className="font-bold">{service.name}</h1>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="w-full py-5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {/* mostrar hora se tiver disponível na data selecionada */}
                  {date && (
                    <div className="botder-t flex gap-3 overflow-x-auto border-solid border-secondary px-5 py-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full p-2"
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-solid border-secondary px-5 py-5">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h2 className="font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h2>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <h2 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h2>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <h2 className="text-sm">{hour}</h2>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <h2 className="text-sm">{barbershop.name}</h2>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                    <Button className="w-full" disabled={!hour || !date}>
                      Confirmar Reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
