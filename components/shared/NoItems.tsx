import { File } from 'lucide-react'

const NoItems = () => {
  return (
    <div className="flex min-h-[400px]  flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex w-20 h-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h2 className="font-semibold mt-6 text-xl">
        Soory no listing for this category found...
      </h2>
      <p className="text-center text-sm mt-2 leading-6 text-muted-foreground">
        Please check other category or create your own listing!
      </p>
    </div>
  )
}
export default NoItems
