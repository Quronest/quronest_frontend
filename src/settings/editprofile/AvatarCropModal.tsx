"use client";

import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { getCroppedImage } from "@/utils/cropImage";

type AvatarCropModalProps = {
  open: boolean;
  image: string;
  onClose: () => void;
  onSave: (file: File) => void;
};

export default function AvatarCropModal({
  open,
  image,
  onClose,
  onSave,
}: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);

  const onCropComplete = useCallback(
    (_: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    const file = await getCroppedImage(image, croppedAreaPixels);

    onSave(file);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full max-w-3xl mx-auto rounded-2xl p-6"
    >
      <h2 className="mb-6 text-xl font-semibold">
        Crop Profile Photo
      </h2>

      <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          restrictPosition
          zoomWithScroll
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}