import { useContext, useState } from "react"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Phone, User, X, ExternalLink, Globe, Pencil, Trash2 } from "lucide-react"
import UserDetails from '@/components/UserDetails.jsx'
import EditPostForm from '@/components/EditPostForm.jsx'
import { Link } from "react-router"
import { AuthContext } from "@/context/authContext"
import { getUserById } from "@/repository/UserRepository"
import { deletePost } from "@/repository/PostRepository"


export default function PostDetails({ post, onClose, isOwner, onPostChanged }) {
  const { token } = useContext(AuthContext)
  const [creatorDetails, setCreatorDetails] = useState(null)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function fetchCreatorDetails() {
    if (creatorDetails) return
    try {
      const data = await getUserById(post.creatorId)
      setCreatorDetails(data)
    } catch (error) {
      console.error("Error fetching creator details:", error)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deletePost(post.id, token)
      setDeleteOpen(false)
      onClose()
      onPostChanged()
    } catch (error) {
      console.error("Error deleting post:", error)
    }
    setIsDeleting(false)
  }

  function handleEditSuccess() {
    setEditOpen(false)
    onPostChanged()
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
          <div className="flex items-center gap-3">
            <ItemTitle className="text-lg">{post.title}</ItemTitle>
            {post.category && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${post.category === 'RENT' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                {post.category === 'RENT' ? 'Издавање' : 'Продажба'}
              </span>
            )}
          </div>
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
        {isOwner && (
          <>
            <Separator />
            <div className="flex gap-2 justify-end">
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:cursor-pointer">
                    <Pencil className="size-4 mr-1" /> Измени
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Измени пост</DialogTitle>
                    <DialogDescription>Направи промени на твојот пост.</DialogDescription>
                  </DialogHeader>
                  <EditPostForm post={post} onSuccess={handleEditSuccess} />
                </DialogContent>
              </Dialog>
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="hover:cursor-pointer">
                    <Trash2 className="size-4 mr-1" /> Избриши
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Избриши пост</DialogTitle>
                    <DialogDescription>Дали сте сигурни дека сакате да го избришете овој пост? Оваа акција не може да се врати.</DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setDeleteOpen(false)} className="hover:cursor-pointer">Откажи</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="hover:cursor-pointer">
                      {isDeleting ? "Бришење..." : "Избриши"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </Item>
    </>
  )
}