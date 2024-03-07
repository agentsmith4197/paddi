import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";


import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrls: string[];
};

const FileUploader = ({ fieldChange, mediaUrls }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrls);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      fieldChange(updatedFiles);
      const newFileUrls = acceptedFiles.map(convertFileToUrl);
      setFileUrls((prevUrls) => [...prevUrls, ...newFileUrls]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrls.length > 0 ? (
        fileUrls.map((fileUrl, index) => (
          <div key={index} className="flex flex-1 justify-center h-10 w-auto p-3 lg:p-7">
            <img src={fileUrl} alt={`image-${index}`} className="file_uploader-img" />
          </div>
        ))
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photos here</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Touch Paddi 
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
