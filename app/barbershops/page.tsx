import BarbershopItem from "../(home)/_components/barbershop-item"
import Header from "../_components/header"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  })
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xs font-bold uppercase text-gray-400">
          Resultados para: &quot;{searchParams.search}&quot;
        </h1>

        <div className="mt-3 grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem Barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
