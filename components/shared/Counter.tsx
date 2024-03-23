'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

const Counter = ({ params }: { params: string }) => {
  const [number, setNumber] = useState<number>(0)
  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={params} value={number} />
      <Button
        onClick={() => (number === 0 ? {} : setNumber(number - 1))}
        variant={'outline'}
        size="icon"
        type="button"
      >
        <Minus className="w-4 h-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{number}</p>
      <Button
        onClick={() => setNumber(number + 1)}
        variant={'outline'}
        size={'icon'}
        type="button"
      >
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  )
}
export default Counter
