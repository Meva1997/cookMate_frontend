import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadUserImage } from "../api/CookMateAPI";

type Props = {
  userId: string;
  imageUrl?: string | null;
  isOwner?: boolean;
};

export default function ProfileImageUploader({
  userId,
  imageUrl,
  isOwner = false,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string>(imageUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPreview(imageUrl ?? "");
  }, [imageUrl]);

  const mutation = useMutation({
    mutationFn: (file: File) => uploadUserImage(file, userId),
    onError: (err) => {
      const message = err?.message || "Failed to upload image";
      toast.error(message);
    },
    onSuccess: (res) => {
      // backend may return { imageUrl } or { image }
      const url = res?.imageUrl ?? res?.image ?? String(res);
      setPreview(url);
      // invalidate user queries so profile shows new image
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      queryClient.invalidateQueries({ queryKey: ["userProfileInfo"] });
      toast.success("Profile image updated");
      setShowModal(false);
      setSelectedFile(null);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setSelectedFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result ?? ""));
    reader.readAsDataURL(f);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }
    mutation.mutate(selectedFile);
  };

  return (
    <div className="relative">
      <div
        className="w-32 h-32 rounded-full bg-cover bg-center shadow-lg"
        style={{ backgroundImage: `url('${preview || ""}')` }}
        aria-hidden
      />

      {isOwner && (
        <button
          onClick={() => setShowModal(true)}
          className="absolute right-0 bottom-0 bg-white dark:bg-[#111827] p-1 rounded-full shadow-md border border-slate-200 dark:border-slate-800"
          aria-label="Change profile image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-700 dark:text-slate-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 3a1 1 0 011-1h3.28a1 1 0 01.7.29l.7.7A1 1 0 0010 3h4a1 1 0 011 1v3a1 1 0 01-.29.7l-7 7a1 1 0 01-.7.29H5a1 1 0 01-1-1V4z" />
            <path d="M13 2l3 3" />
          </svg>
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 w-full max-w-md p-6 bg-white dark:bg-[#111827] rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Upload profile image
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Choose an image to use as your profile picture.
            </p>

            <div className="mt-4">
              <div className="flex justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] dark:border-[#3a3a3a] px-6 py-8">
                <div className="text-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 rounded-md mx-auto"
                    />
                  ) : (
                    <svg
                      aria-hidden
                      className="mx-auto h-12 w-12 text-[#64748b] dark:text-[#94a3b8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <div className="mt-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-md bg-green-950/80 text-white dark:bg-[#d2b48c] dark:text-black hover:cursor-pointer hover:opacity-70"
                      >
                        Choose file
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(imageUrl ?? "");
                          setSelectedFile(null);
                        }}
                        className="px-3 py-1 rounded-md bg-red-500 text-white hover:cursor-pointer hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-slate-700 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 rounded-md bg-green-950/80 text-white hover:cursor-pointer hover:opacity-70"
              >
                {mutation.isPending ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
