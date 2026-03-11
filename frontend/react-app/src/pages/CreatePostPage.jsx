import PostForm from "@/components/PostForm";
import Header from "@/components/Header";
import {useContext} from "react";
import {AuthContext} from "@/context/authContext";
import {Button} from "@/components/ui/button";
import {Link} from "react-router";
import {Field, FieldDescription, FieldLegend, FieldSet} from "@/components/ui/field";

const CreatePostPage = () => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <div className='h-screen'>
            <Header/>
            {isAuthenticated ? (
                <div className='h-screen text-left flex justify-center items-center'>
                    <PostForm/>
                </div>
            ) : (
                <div className=' h-[90%] text-left flex justify-center items-center'>
                    <div className='flex flex-col gap-3 p-5 border-1 border-solid border-white rounded-lg'>
                        <FieldSet className="w-max">
                            <FieldLegend>You should be logged in to create post!</FieldLegend>
                            <FieldDescription>
                                Login to your account or create one if you still don't have one:
                            </FieldDescription>
                        </FieldSet>
                        <Field orientation="horizontal">
                            <Button><Link to={'/login'}>Login</Link></Button>
                            <Button variant="outline" type="button">
                                <Link to={'/register'}>Signup</Link>
                            </Button>
                        </Field>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePostPage