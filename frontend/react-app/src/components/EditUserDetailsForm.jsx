import {useContext, useEffect} from "react";
import {AuthContext} from "@/context/authContext.jsx";
import {editUser} from "@/repository/UserRepository";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import {Field, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";

export default function EditUserDetailsForm({data, onSuccess}) {
    const {token} = useContext(AuthContext);

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phoneNumber: "",
            aboutMe: "",
            birthDate: "",
        },
    });

    const {formState: {isSubmitting}} = form;

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            form.reset({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                username: data.username || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
                aboutMe: data.aboutMe || "",
                birthDate: data.birthDate || "",
            });
        }
    }, [data]);

    async function onSubmit(formData) {
        const {username, ...editData} = formData;

        try {
            await editUser(editData, token);
            toast.success("Profile updated successfully");
            form.reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.message);
        }
    }

    function handleCancel() {
        form.reset();
    }

    return (
        <div className="w-full max-w-lg">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({field}) => (
                                    <Field>
                                        <FieldLabel htmlFor="user_username">Username</FieldLabel>
                                        <Input
                                            id="user_username"
                                            {...field}
                                            disabled
                                        />
                                    </Field>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="firstName"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field>
                                            <FieldLabel htmlFor="user_firstName">First Name</FieldLabel>
                                            <Input
                                                id="user_firstName"
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
                                    name="lastName"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field>
                                            <FieldLabel htmlFor="user_lastName">Last Name</FieldLabel>
                                            <Input
                                                id="user_lastName"
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="user_email">Email</FieldLabel>
                                        <Input
                                            id="user_email"
                                            type="email"
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
                                name="phoneNumber"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="user_phoneNumber">Phone Number</FieldLabel>
                                        <Input
                                            id="user_phoneNumber"
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
                                name="birthDate"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="user_birthDate">Birth Date</FieldLabel>
                                        <Input
                                            id="user_birthDate"
                                            type="date"
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
                                name="aboutMe"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field>
                                        <FieldLabel htmlFor="user_aboutMe">More info</FieldLabel>
                                        <Textarea
                                            id="user_aboutMe"
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
                        <div className="flex gap-2">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}