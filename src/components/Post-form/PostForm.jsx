import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
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

    // -------------------------------
    // ⭐ Main submit handler
    // -------------------------------
    const submit = async (data) => {
        try {
            // Basic validation: ensure image selected when creating a new post (form already enforces required, but guard here)
            const hasImageFile = Array.isArray(data.image) && data.image[0];

            // If updating an existing post
            if (post) {
                let uploadedFile = null;
                if (hasImageFile) {
                    uploadedFile = await appwriteService.uploadFile(data.image[0]);
                    if (!uploadedFile) throw new Error("Image upload failed");

                    // delete old image only after successful upload
                    if (post.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
                return;
            }

            // Creating a new post
            if (!hasImageFile) {
                // if image is required, show message
                alert("Please select a featured image before submitting a new post.");
                return;
            }

            const uploaded = await appwriteService.uploadFile(data.image[0]);
            if (!uploaded) throw new Error("Image upload failed");

            data.featuredImage = uploaded.$id;

            // Ensure we have a valid user id; try redux state first then fallback to Appwrite
            let currentUserId = userData?.$id;
            if (!currentUserId) {
                try {
                    const current = await authService.getCurrentUser();
                    currentUserId = current?.$id;
                } catch (err) {
                    console.warn("Could not fetch current user from Appwrite:", err);
                }
            }

            if (!currentUserId) {
                alert("You must be logged in to create a post.");
                return;
            }

            const dbPost = await appwriteService.createPost({ ...data, userId: currentUserId });
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Post submit error:", error);
            alert("Failed to submit post. See console for details.");
        }
    };


    // ------------------------------------------------
    // Generate slug automatically from title
    // ------------------------------------------------
    const slugTransform = useCallback((value) => {
        if (!value) return "";
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // ------------------------------------------
    // JSX
    // ------------------------------------------
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Section */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-gray-200 ml-1 rounded pl-2"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-gray-200 ml-1 rounded pl-2"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Section */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 p-2 rounded-lg cursor-pointer bg-white"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* Image Preview */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 cursor-pointer"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-full mt-2 cursor-pointer"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
