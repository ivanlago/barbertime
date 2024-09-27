import { db } from "@/app/_lib/prima"
import BarbershopInfo from "../_components/barbershop-info"

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    // TODO redirecionar para a home
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!barbershop) {
    // TODO redirecionar para a home
    return null
  }

  return <BarbershopInfo barbershop={barbershop} />
}

export default BarbershopDetailsPage
