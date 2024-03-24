'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Heart, Loader2 } from 'lucide-react'

const AddFavoriteButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button variant={'ghost'} size={'icon'} disabled>
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={'ghost'}
          size={'icon'}
          type="submit"
          className="hover:!bg-none"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  )
}
export default AddFavoriteButton
