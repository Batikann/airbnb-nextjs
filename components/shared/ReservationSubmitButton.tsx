'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

export function ReservationSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  )
}
