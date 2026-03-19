import { useState } from "react"
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemSeparator, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Phone, User, X, ExternalLink, Globe } from "lucide-react"
import UserDetails from '@/components/UserDetails.jsx'
import { Link } from "react-router"


export default function PostDetails({ post, onClose }) {
  const [creatorDetails, setCreatorDetails] = useState(null)
  const [open, setOpen] = useState(false)

  async function fetchCreatorDetails() {
    if (creatorDetails) return
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/${post.creatorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setCreatorDetails(data)
      }
    } catch (error) {
      console.error("Error fetching creator details:", error)
    }
  }

  const changeOpenDialog = async (isOpen) => {
    if (isOpen) {
      await fetchCreatorDetails()
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  return (
    <>
      <Item>
        <div className="flex justify-between w-full">
          <ItemTitle className="text-lg">{post.title}</ItemTitle>
          <ItemActions>
            <Button variant="ghost" size="icon" className="rounded-full hover:cursor-pointer"
                    onClick={onClose}>
              <X />
            </Button>
          </ItemActions>
        </div>
        <Separator />
        <ItemDescription className="text-left text-foreground">{post.description}</ItemDescription>
        <ItemContent className="w-full text-left">
          <ItemDescription>{post.location}</ItemDescription>
          <ItemDescription>{post.priceAmount} {post.priceCurrency}</ItemDescription>
        </ItemContent>
        <Separator />
        {post.creatorId ? (
          <ItemContent className="w-full text-left">
            <ItemTitle>Детали за контакт:</ItemTitle>
            <div className="flex flex-col gap-2 pl-2 pt-2">
              <div className="flex items-center gap-2">
                <User size="16" />
                <Dialog open={open} onOpenChange={changeOpenDialog}>
                  <DialogTrigger asChild>
                    <Button variant="link"
                            className="text-sm text-muted-foreground underline hover:text-accent hover:cursor-pointer p-0">
                      {post.creatorName}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle />
                      <DialogDescription />
                    </DialogHeader>
                    <UserDetails data={creatorDetails} canEdit={false} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-2">
                <Mail size="16" />
                <ItemDescription>{post.creatorEmail}</ItemDescription>
              </div>
              {post.creatorPhoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone size="16" />
                  <ItemDescription>{post.creatorPhoneNumber}</ItemDescription>
                </div>
              )}
            </div>
          </ItemContent>
        ) : (
          <ItemContent className="w-full text-left">
            <ItemTitle>Детали за оригиналниот пост:</ItemTitle>
            <div className="flex flex-col gap-2 pl-2 pt-2">
              <div className="flex items-center gap-2">
                <ExternalLink size="16" />
                <ItemDescription><Link to={post.originalPostUrl} target="_blank"
                                       rel="noopener noreferrer">{post.originalPostUrl}</Link></ItemDescription>
              </div>
              <div className="flex items-center gap-2">
                <Globe size="16" />
                <ItemDescription>{post.fetchedFrom}</ItemDescription>
              </div>
            </div>
          </ItemContent>
        )}
      </Item>
    </>
  )
}