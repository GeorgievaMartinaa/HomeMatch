import * as z from "zod"
import {useForm, Controller,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";
import {useContext, useState} from "react";
import {AuthContext} from "@/context/authContext";


const formSchema = z.object({
    title: z
        .string()
        .min(10, "Title must be at least 10 characters."),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters.")
})

const PostForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const {token} = useContext(AuthContext)
    const { formState: { isSubmitting } } = form;

    async function onSubmit(data) {

        try {
            const response = await fetch("http://localhost:8080/api/v1/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                toast.error(await response.text(), { position: "top-center",style: {backgroundColor: 'red'} })
                form.reset();
                return;
            }

            toast.success( await response.text(), { position: "top-center", style: {backgroundColor: 'green'} })

        } catch (error) {
            console.error("Error submitting form:", error);
        }
        form.reset();

    }

    return (
        <div className="w-full max-w-lg">
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Post your accommodation</FieldLegend>
                        <FieldDescription>
                            Create post for the accommodation that you are renting or looking for. Enter as much
                            details as you can for the best results. Enter the location and price as the most important
                            details.
                        </FieldDescription>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="form_title">
                                            Title
                                        </FieldLabel>
                                        <Input
                                            id="form_title"
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
                                        <FieldLabel htmlFor="form_description">
                                            Description
                                        </FieldLabel>
                                        <Textarea
                                            id="form_description"
                                            placeholder="Enter accommodation description"
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}/>
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default PostForm;