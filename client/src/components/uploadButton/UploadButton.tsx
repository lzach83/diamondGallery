import React from "react";

export default function UploadButton() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const result = await fetch("http://localhost:8080/uploadImage", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <button onClick={() => fileInputRef.current?.click()}>
        Upload Image
      </button>
      <input
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        name="files"
        accept="image/png, image/jpeg, image/gif, image/svg+xml"
        multiple // Allow multiple file selection
      />
      <p className="mt-1 text-sm text-gray-500" id="file_input_help">
        SVG, PNG, JPG, or GIF.
      </p>
      <button onClick={handleUpload}>Upload Files</button>
    </>
  );
}
