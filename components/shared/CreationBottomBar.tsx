import Link from 'next/link'
import { Button } from '../ui/button'
import SubmitButton from './SubmitButton'

const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant={'secondary'} asChild size={'lg'}>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton />
      </div>
    </div>
  )
}
export default CreationBottomBar
