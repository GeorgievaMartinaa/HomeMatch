import * as z from "zod"
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";
import {useContext} from "react";
import {AuthContext} from "@/context/authContext";
import {editPost} from "@/repository/PostRepository";

const formSchema = z.object({
    title: z
        .string()
        .min(10, "Title must be at least 10 characters."),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters.")
})

export default function EditPostForm({post, onSuccess}) {
    const {token} = useContext(AuthContext)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: post.title || "",
            description: post.description || "",
        },
    })

    const {formState: {isSubmitting}} = form;

    async function onSubmit(data) {
        try {
            const text = await editPost(post.id, data, token)
            toast.success(text, {position: "top-center", style: {backgroundColor: 'green'}})
            onSuccess();
        } catch (error) {
            toast.error(error.message, {position: "top-center", style: {backgroundColor: 'red'}})
        }
    }

    return (
        <div className="w-full max-w-lg">
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="edit_post_title">Title</FieldLabel>
                                        <Input
                                            id="edit_post_title"
                                            placeholder="Enter title"
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="edit_post_description">Description</FieldLabel>
                                        <Textarea
                                            id="edit_post_description"
                                            placeholder="Enter accommodation description"
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}