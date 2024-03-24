import { ListingCard } from '@/components/shared/HomeCard'
import NoItems from '@/components/shared/NoItems'
import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAT: 'desc',
    },
  })

  return data
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) return redirect('/')
  const data = await getData(user?.id as string)
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {data.length === 0 ? (
        <NoItems
          title="Your dont have any Homes listed"
          description="Please list a home on airbnb so that you can see it right here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item?.id}
              description={item?.description as string}
              location={item?.country as string}
              pathName="/my-homes"
              homeId={item?.id as string}
              imagePath={item?.photo as string}
              price={item?.price as number}
              userId={user.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={
                (item?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
