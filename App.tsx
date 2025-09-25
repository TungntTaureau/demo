import React, { useState } from "react";
// FIX: Use relative paths for imports.
import { Header } from "./components/Header";
import { InputSection } from "./components/InputSection";
import { OutputSection } from "./components/OutputSection";
import { generateImage } from "./services/geminiService";
import { GenerationOptions } from "./types";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async (
    imageFile: File,
    options: GenerationOptions
  ) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    try {
      const images = await generateImage(imageFile, options);
      setGeneratedImages(images);
    } catch (e: any) {
      setError(e.message || "Đã xảy ra lỗi không mong muốn.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="liquid-glass-bg text-white min-h-screen font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40"></div>
      <div className="w-2/3 mx-auto px-4 py-8 relative z-10">
        <Header />
        <main className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection onGenerate={handleGenerate} isLoading={isLoading} />
          <OutputSection
            generatedImages={generatedImages}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Master AI. Developed by Nguyen
            Duong.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
