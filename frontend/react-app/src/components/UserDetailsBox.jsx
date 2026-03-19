import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.jsx";
import EditUserDetailsForm from "@/components/EditUserDetailsForm.jsx";
import UserDetails from "@/components/UserDetails.jsx";

export default function UserDetailsBox({data, isLoading}) {

    return (
        <div
            className=" py-5 pr-5 w-full flex flex-col  justify-self-center gap-3 border-4 border-double border-card rounded-xl shadow-md shadow-card-foreground/20">
            <UserDetails data={data}/>
            <div className="flex justify-end">
                <Dialog>
                    <DialogTrigger><Button>Измени податоци</Button></DialogTrigger>
                    <DialogContent>
                        <EditUserDetailsForm data={data}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
