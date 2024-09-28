import { db } from "@/app/_lib/prima"
import BarbershopInfo from "../_components/barbershop-info"
import ServiceItem from "../_components/service-item"
import { getServerSession } from "next-auth"
import AuthProvider from "@/app/_providers/auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    // TODO redirecionar para a home
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    // TODO redirecionar para a home
    return null
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 px-5 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
