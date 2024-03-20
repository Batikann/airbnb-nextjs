'use client'

import { categoryItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const MapFilter = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('filter')
  const pathName = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll  no-scrollbar">
      {categoryItems.map((categorItem) => (
        <Link
          key={categorItem.id}
          href={pathName + '?' + createQueryString('filter', categorItem.name)}
          className={cn(
            search === categorItem.name
              ? 'border-b-2 border-black pb-2 flex-shrink-0'
              : 'opacity-70 flex-shrink-0'
          )}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="relative: w-6 h-6 ">
              <Image
                src={categorItem.imageUrl}
                alt={categorItem.title}
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium">{categorItem.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default MapFilter
