"use client";

import React, { useState, useRef, Suspense } from 'react';
import Header from '@/components/common/Header';
import { Upload, X, ArrowRight, Loader2 } from 'lucide-react';
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { ParticleSphere } from "@/components/ui/3d-orbit-gallery"

export default function GalleryPage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSelectedImages(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const startGallery = () => {
    if (selectedImages.length > 0) {
      setIsGalleryView(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      <Header />

      {!isGalleryView ? (
        <main className="flex-grow flex flex-col items-center justify-center p-6 pt-24 space-y-8 relative z-10">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 animate-pulse">
              Love Gallery
            </h1>
            <p className="text-xl text-zinc-400 font-light">
              Select your favorite memories to create a stunning 3D cosmic gallery.
            </p>
          </div>

          <div className="w-full max-w-4xl min-h-[300px] border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-8 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-zinc-900/80">
            {selectedImages.length === 0 ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold">Upload Photos</h3>
                <p className="text-zinc-500">Drag & drop or click to select multiple images</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-pink-600 rounded-full font-bold hover:bg-pink-700 transition-all hover:scale-105 active:scale-95"
                >
                  Select Images
                </button>
              </div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {selectedImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square group rounded-xl overflow-hidden border border-white/10">
                      <img src={img} alt={`Memory ${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-500/10 transition-all"
                  >
                    <Upload size={24} className="text-zinc-500" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={startGallery}
                    className="px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <span>Launch Gallery</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        </main>
      ) : (
        <div className="w-full h-screen bg-black relative">
          <button
            onClick={() => setIsGalleryView(false)}
            className="absolute top-24 left-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20 hover:bg-white/20 transition-all"
          >
            ← Back to Upload
          </button>

          <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <ParticleSphere images={selectedImages} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
            <p className="text-white/30 text-sm uppercase tracking-widest animate-pulse">Drag to Rotate • Scroll to Zoom</p>
          </div>
        </div>
      )}
    </div>
  );
}