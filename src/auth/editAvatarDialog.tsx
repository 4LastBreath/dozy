import React, { useEffect, useRef, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import AvatarEditor from "react-avatar-editor";

type EditAvatarDialogProps = {
  avatarUrl: string,
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>
  setAvatarFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const EditAvatarDialog = ({avatarUrl, setAvatarUrl, setAvatarFile} : EditAvatarDialogProps) => {

  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);
  const [temporaryUrl, setTemporaryUrl] = useState('')

  const downloadCurrentImage = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const localUrl = URL.createObjectURL(blob);
    setTemporaryUrl(localUrl);
  };

  const onClickSave = () => {

    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });
          setAvatarFile(file);
          const dataUrl = URL.createObjectURL(blob);
          setAvatarUrl(dataUrl);
        }
      }, 'image/jpeg');
    }
    
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Max 5MB
      if (file.size <= 1024 * 1024 * 5) {
        const newAvatarUrl = URL.createObjectURL(file);
        setTemporaryUrl(newAvatarUrl);
      }
    }
  };

  useEffect(() => {
    downloadCurrentImage(avatarUrl)
  }, [])

  return (
<DialogContent>
  <DialogHeader>
    <DialogTitle>Edit Avatar</DialogTitle>
    <DialogDescription>Change and adjust your avatar. Don't forget to save changes when you're done!</DialogDescription>
  </DialogHeader>
  <div className="flex flex-col item-center justify-center gap-6">
    <AvatarEditor
      ref={editorRef}
      image={temporaryUrl || avatarUrl}
      width={200}
      height={200}
      border={10}
      borderRadius={150}
      color={[0, 0, 0, 0.6]}
      scale={scale}
      rotate={0}
      className="mx-auto rounded"
    /> 
    <Slider
      onValueChange={(val) => setScale(val[0])}
      min={1}
      max={3}
      step={0.1}
      value={[scale]}
      aria-label="zoom control"
    />
    <Input type="file" accept="image/*" onChange={handleFileUpload} className="mt-3"/>

  </div>
  <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={onClickSave}>Edit</Button>
          </DialogClose>
  </DialogFooter>
</DialogContent>
  );
};

export default EditAvatarDialog;