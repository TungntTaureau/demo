import React from "react";
import { LiquidGlass } from "./LiquidGlass";
import { Spinner } from "./Spinner";

interface OutputSectionProps {
  generatedImages: string[];
  isLoading: boolean;
  error: string | null;
}

const DownloadButton: React.FC<{ imageUrl: string; index: number }> = ({
  imageUrl,
  index,
}) => {
  return (
    <a
      href={imageUrl}
      download={`master-ai-image-${index + 1}.png`}
      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      title="Tải xuống"
    >
      <LiquidGlass variant="button" className="secondary w-10 h-10 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </LiquidGlass>
    </a>
  );
};

export const OutputSection: React.FC<OutputSectionProps> = ({
  generatedImages,
  isLoading,
  error,
}) => {
  return (
    <LiquidGlass
      variant="card"
      className="animated flex flex-col justify-center items-center min-h-[400px] lg:min-h-full"
    >
      <h2 className="text-2xl font-bold text-purple-300 mb-4 font-orbitron self-start text-center">
        KẾT QUẢ
      </h2>
      <div className="w-full flex-grow flex items-center justify-center">
        {isLoading && <Spinner />}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {!isLoading && !error && generatedImages.length === 0 && (
          <p className="text-slate-300 text-center">
            Kết quả của bạn sẽ xuất hiện ở đây.
          </p>
        )}
        {generatedImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {generatedImages.map((image, index) => (
              <LiquidGlass
                key={index}
                variant="dock"
                className="relative group aspect-w-1 aspect-h-1 p-1"
              >
                <img
                  src={image}
                  alt={`Generated result ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <DownloadButton imageUrl={image} index={index} />
              </LiquidGlass>
            ))}
          </div>
        )}
      </div>
    </LiquidGlass>
  );
};
