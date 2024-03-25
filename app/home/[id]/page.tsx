import { createReservation } from '@/app/action'
import CategoryShowcase from '@/components/shared/CategoryShowcase'
import HomeMap from '@/components/shared/HomeMap'
import { ReservationSubmitButton } from '@/components/shared/ReservationSubmitButton'
import SelectCalender from '@/components/shared/SelectCalender'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCountries } from '@/constants'
import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

async function getData(homeId: string) {
  const data = await prisma.home.findFirst({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      createdAT: true,
      price: true,
      country: true,
      Reservations: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })
  return data
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string }
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(params.id)
  const { getCountryByValue } = useCountries()
  const country = await getCountryByValue(data?.country as string)
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="text-2xl mb-5 font-medium">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://korytafaojwanmbffhep.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of house"
          fill
          className=" rounded-lg h-full object-cover"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guest</p> * <p>{data?.bedrooms} Bedrooms</p> *
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <img
              className="w-11 h-11 rounded-full"
              src={data?.User?.profileImage as string}
              alt="User Profile"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium ">
                Hosted by {data?.User?.firstName} {data?.User?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalender reservation={data?.Reservations} />

          {user?.id ? (
            <div>
              <ReservationSubmitButton />
            </div>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservations</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
