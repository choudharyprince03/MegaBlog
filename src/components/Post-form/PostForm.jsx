import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // -------------------------------------------------------------------
  // SAFARI FIX → Convert HEIC to JPG
  // -------------------------------------------------------------------
  const convertIfHEIC = async (file) => {
    if (!file || !file.type.includes("heic")) return file;

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              const newFile = new File([blob], "converted.jpg", {
                type: "image/jpeg",
              });
              resolve(newFile);
            },
            "image/jpeg",
            0.9
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // -------------------------------------------------------------------
  // SUBMIT
  // -------------------------------------------------------------------
  const submit = async (data) => {
    try {
      let fileID = post?.featuredImage || null;

      // Handle image
      if (data.image && data.image[0]) {
        let file = data.image[0];

        // iPhone Safari fix
        file = await convertIfHEIC(file);

        const uploaded = await appwriteService.uploadFile(file);
        if (uploaded) {
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
          fileID = uploaded.$id;
        }
      }

      let dbPost;

      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileID,
        });
      } else {
        dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileID,
          userId: userData.$id,
        });
      }

      if (!dbPost) throw new Error("Post creation failed");

      // SAFARI FIX → Delay navigation slightly
      setTimeout(() => {
        navigate(`/post/${dbPost.$id}`, { replace: true });
      }, 10);
    } catch (e) {
      console.error("Safari PostForm Error:", e);
      alert("Something went wrong. Try again.");
    }
  };

  // -------------------------------------------------------------------
  // Slug auto update
  // -------------------------------------------------------------------
  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-")
      .replace(/-+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // -------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
      <Input label="Title :" 
            placeholder="Enter post title"
      {...register("title", { required: true })} />

      <Input
        label="Slug :"
        placeholder="auto-generated from title"
        {...register("slug", { required: true })}
        onInput={(e) =>
          setValue("slug", slugTransform(e.currentTarget.value))
        }
      />

      <Input
        placeholder="Upload featured image"
        label="Featured Image :"
        type="file"
        accept="image/*"
        {...register("image", { required: !post })}
      />

      {post?.featuredImage && (
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          className="rounded-lg w-full"
        />
      )}

      <Select
        options={["active", "inactive"]}
        label="Status"
        {...register("status", { required: true })}
      />

      <RTE
        label="Content :"
        control={control}
        name="content"
        defaultValue={getValues("content")}
      />

      <Button type="submit" className="w-full p-4 rounded-xl">
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
}
