"use client";

import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { clsx } from "clsx";

import Avatar from "@/components/ui/Avatar";
import AvatarCropModal from "./AvatarCropModal";

import type { EditProfileForm } from "@/types/EditProfiletypes";

export default function AvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { watch, setValue } = useFormContext<EditProfileForm>();

  const avatar = watch("avatar");
  const fullName = watch("fullName");

  const [preview, setPreview] = useState("");
  const [cropOpen, setCropOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (typeof avatar === "string") {
      setPreview(avatar);
    } else if (avatar instanceof File) {
      const url = URL.createObjectURL(avatar);

      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview("");
    }
  }, [avatar]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      if (selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [preview, selectedImage]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setCropOpen(true);
  };

  const handleCropSave = (file: File) => {
    const previewUrl = URL.createObjectURL(file);

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(previewUrl);

    setValue("avatar", file);

    if (selectedImage.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage("");
    setCropOpen(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCloseModal = () => {
    if (selectedImage.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage("");
    setCropOpen(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={openFilePicker}
          className="group relative rounded-full"
        >
          <Avatar
            src={preview}
            alt={fullName || "User"}
            name={fullName || "User"}
            size="xl"
            className="transition-all duration-300 group-hover:scale-105"
          />

          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center rounded-full bg-black/55 opacity-0 transition-all duration-300",
              "group-hover:opacity-100",
            )}
          >
            <Camera size={32} className="text-white" />
          </div>
        </button>

        <h2 className="mt-6 text-xl font-semibold">Profile Photo</h2>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
      />

      <AvatarCropModal
        open={cropOpen}
        image={selectedImage}
        onClose={handleCloseModal}
        onSave={handleCropSave}
      />
    </>
  );
}
