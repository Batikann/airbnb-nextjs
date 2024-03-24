import { ListingCard } from '@/components/shared/HomeCard'
import MapFilter from '@/components/shared/MapFilter'
import NoItems from '@/components/shared/NoItems'
import SkeletonCard from '@/components/shared/SkeletonCard'
import prisma from '@/lib/db'
import Link from 'next/link'
import { Suspense } from 'react'

async function getData({
  searchParams,
}: {
  searchParams?: { filter?: string }
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  })

  return data
}

export default function Home({
  searchParams,
}: {
  searchParams?: { filter?: string }
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilter />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string }
}) {
  const data = await getData({ searchParams: searchParams })
  return (
    <>
      {data.length === 0 ? (
        <NoItems />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 ">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              description={item.description as string}
              location={item.country as string}
              price={item.price as number}
            />
          ))}
        </div>
      )}
    </>
  )
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
