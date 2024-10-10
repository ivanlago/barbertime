"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface saveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

const saveBooking = async (params: saveBookingParams) => {
  await db.booking.create({
    data: {
      barbershopId: params.barbershopId,
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
    },
  })

  revalidatePath("/")
  revalidatePath("/bookings")
}

export default saveBooking
