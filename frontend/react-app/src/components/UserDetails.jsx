import { Item, ItemContent, ItemDescription, ItemHeader, ItemSeparator, ItemTitle } from "@/components/ui/item.jsx"
import { SquarePen } from "lucide-react"
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import EditUserDetailsForm from '@/components/EditUserDetailsForm.jsx'
import { Spinner } from '@/components/ui/spinner.jsx'
import { useState } from 'react'

export default function UserDetails({ data, isLoading, onUserUpdated, canEdit, title }) {
  const [open, setOpen] = useState(false)

  function handleSuccess() {
    setOpen(false)
    onUserUpdated()
  }

  return (
    isLoading ? <Spinner /> : (
      <Item
        className={` ${canEdit ? 'py-10 pr-10 border-4 border-double border-card rounded-xl shadow-md shadow-card-foreground/20' : 'p-0'} gap-5 w-fit flex flex-col`}>
        <div className="flex justify-between items-center w-full">
          <ItemHeader className="font-bold text-xl text-accent">{title ? title : 'User info'}</ItemHeader>
          {canEdit && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="hover:cursor-pointer hover:text-accent text-white">
                  <SquarePen className="size-6" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Edit your data
                  </DialogDescription>
                </DialogHeader>
                <EditUserDetailsForm data={data} onSuccess={handleSuccess} />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <ItemSeparator />
        <div className={`${canEdit ? 'flex gap-5 lg:gap-20 flex-wrap' : ' flex flex-col gap-2'} w-full`}>
          <div className="flex flex-col gap-2 h-1/2">
            <ItemContent className="flex flex-row gap-2 h-1/2">
              <ItemTitle>User:</ItemTitle>
              <ItemDescription>{data.firstName} {data.lastName}</ItemDescription>
            </ItemContent>
            <ItemContent className="flex flex-row gap-2 h-1/2">
              <ItemTitle>Username:</ItemTitle>
              <ItemDescription>{data.username}</ItemDescription>
            </ItemContent>
          </div>
          <div className="flex flex-col gap-2 h-1/2">
            <ItemContent className="flex flex-row gap-2 h-1/2">
              <ItemTitle>Email:</ItemTitle>
              <ItemDescription>{data.email} </ItemDescription>
            </ItemContent>

            {data.phoneNumber && (
              <ItemContent className="flex flex-row gap-2 h-1/2">
                <ItemTitle>Phone number:</ItemTitle>
                <ItemDescription>{data.phoneNumber}</ItemDescription>
              </ItemContent>
            )}
          </div>
          <div className="flex flex-col gap-2 h-1/2">
            {data.birthDate && (
              <ItemContent className="flex flex-row gap-2 h-1/2">
                <ItemTitle>Birth date:</ItemTitle>
                <ItemDescription>{data.birthDate} </ItemDescription>
              </ItemContent>
            )}
            {data.age > 0 && (
              <ItemContent className="flex flex-row gap-2 h-1/2">
                <ItemTitle>Years old:</ItemTitle>
                <ItemDescription>{data.age}</ItemDescription>
              </ItemContent>
            )}

          </div>
        </div>
        {data.aboutMe && (
          <div className="w-full">
            <ItemContent className="flex text-start gap-2">
              <ItemTitle>More info:</ItemTitle>
              <ItemDescription className="w-full">{data.aboutMe} </ItemDescription>
            </ItemContent>
          </div>
        )}
      </Item>
    ))
}