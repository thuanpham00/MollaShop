// eslint-disable-next-line import/no-unresolved
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
  // eslint-disable-next-line import/no-unresolved
} from "@/ui/sheet"

interface Props {
  className: string
}

export default function AsideFilter_mobile({ className }: Props) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
