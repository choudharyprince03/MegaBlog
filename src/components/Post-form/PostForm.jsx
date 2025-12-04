 import { useCallback, useEffect } from "react";
 import { useForm } from "react-hook-form"; 
 import { Button, Input, RTE, Select } from ".."; 
 import appwriteService from "../../appwrite/config"; 
 import { useNavigate } from "react-router-dom"; 
 import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) appwriteService.deleteFile(post.featuredImage);

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    // Slug auto-update
    const slugTransform = useCallback((value) => {
        if (!value) return "";
        return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form 
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-6"
        >
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4 bg-gray-200 rounded pl-2"
                {...register("title", { required: true })}
            />

            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4 bg-gray-200 rounded pl-2"
                {...register("slug", { required: true })}
                onInput={(e) =>
                    setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true,
                    })
                }
            />

            <Input
                label="Featured Image :"
                type="file"
                className="mb-4 p-2 rounded-lg cursor-pointer bg-white"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />

            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg w-full"
                    />
                </div>
            )}

            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4 cursor-pointer"
                {...register("status", { required: true })}
            />

            <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />

            <Button
                type="submit"
                bgColor={post ? "bg-green-500" : "bg-blue-500"}
                className="w-full mt-2 cursor-pointer"
                
            >
                {post ? "Update" : "Submit"}
            </Button>
        </form>
    );
}
