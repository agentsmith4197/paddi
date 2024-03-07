"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import uploadFilesToFirebase from "@/app/api/firebase/fileUpload"; // Import the file upload function for Firebase
import FileUploader from "../shared/FileUploader";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]); // State to hold the selected files

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      // Upload files to Firebase Storage
      const uploadedImageUrls = await uploadFilesToFirebase(files);

      const threadData = {
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
        images: uploadedImageUrls,
      };

      await createThread(threadData);

      router.push("/");
    } catch (error) {
      console.error("Error posting thread:", error);
      // Handle error
    }
  };

  const handleImageUpload = (uploadedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUploader
          fieldChange={handleImageUpload}
          mediaUrls={[]} // Pass any initial image URLs if needed
        />

        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-auto h-7" />
        ))}

        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
