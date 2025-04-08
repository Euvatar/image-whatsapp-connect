
import React, { useState, useRef } from "react";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Por favor, selecione uma imagem válida.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        onImageSelect(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "image-upload-area relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all",
        isDragging 
          ? "border-primary bg-primary/10" 
          : "border-gray-300 hover:border-primary",
        preview ? "h-64" : "h-44"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
      
      {preview ? (
        <div className="h-full w-full flex flex-col justify-center items-center relative">
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
            <p className="text-white font-medium">Alterar imagem</p>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <Image className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-lg font-medium text-gray-700">
            Arraste e solte sua imagem aqui
          </p>
          <p className="text-sm text-gray-500 mt-1">
            ou clique para selecionar
          </p>
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG ou GIF (máx. 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
