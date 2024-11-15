import { redirect } from "next/navigation"
import BarbershopItem from "../(home)/_components/barbershop-item"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import Search from "../(home)/_components/search"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/")
  }

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
      <Search />

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
