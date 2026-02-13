'use client';
import { useState, useRef } from 'react';
 import AppImage from'@/components/ui/AppImage';
 import Icon from'@/components/ui/AppIcon';

interface ImageUploadProps {
  uploadedImages: string[]
  onUploadImages: (images: string[]) => void
}

export default function ImageUpload({ uploadedImages, onUploadImages }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const imageUrls = files.map(file => URL.createObjectURL(file))
    onUploadImages([...uploadedImages, ...imageUrls])
  }

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index)
    onUploadImages(newImages)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Icon name="PhotoIcon" size={40} className="text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {isDragging ? 'Drop your photos here!' : 'Upload Your Photos'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Drag and drop your photos here, or click to browse. Upload single or couple photos for AI transformation.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="CheckCircleIcon" size={14} className="text-success" />
              JPG, PNG
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CheckCircleIcon" size={14} className="text-success" />
              Max 10MB
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CheckCircleIcon" size={14} className="text-success" />
              Up to 5 photos
            </span>
          </div>
        </div>
      </div>

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="PhotoIcon" size={16} className="text-primary" />
            Uploaded Photos ({uploadedImages.length})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={`uploaded_${index}`}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <AppImage
                  src={image}
                  alt={`Uploaded photo ${index + 1} for Valentine card`}
                  className="w-full h-full object-cover"
                />
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  aria-label="Remove photo"
                >
                  <Icon name="XMarkIcon" size={16} className="text-white" />
                </button>

                {/* Index Badge */}
                <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}