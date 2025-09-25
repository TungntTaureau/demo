import React, { useState } from "react";
import {
  ASPECT_RATIO_OPTIONS,
  LIGHTING_OPTIONS,
  NATIONALITY_OPTIONS,
  OUTFIT_OPTIONS,
  POSE_OPTIONS,
  QUALITY_OPTIONS,
} from "../constants";
import {
  AspectRatio,
  GenerationOptions,
  ImageQuality,
  LightingStyle,
  Nationality,
  Outfit,
  Pose,
} from "../types";
import { LiquidGlass } from "./LiquidGlass";

interface InputSectionProps {
  onGenerate: (imageFile: File, options: GenerationOptions) => void;
  isLoading: boolean;
}

const SelectInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-slate-200 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-slate-700/80 border border-slate-500/50 rounded-lg shadow-sm py-2 px-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 sm:text-sm"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-slate-800"
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-slate-200 mb-2">
      {label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={2}
      className="w-full bg-slate-700/80 border border-slate-500/50 rounded-lg shadow-sm py-2 px-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 sm:text-sm resize-none placeholder-slate-400"
    />
  </div>
);

export const InputSection: React.FC<InputSectionProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [outfit, setOutfit] = useState<Outfit>(Outfit.SIEU_ANH_HUNG);
  const [pose, setPose] = useState<Pose>(Pose.TU_TIN);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    AspectRatio.LANDSCAPE_16_9
  );
  const [lighting, setLighting] = useState<LightingStyle>(
    LightingStyle.DEFAULT
  );
  const [quality, setQuality] = useState<ImageQuality>(ImageQuality.EIGHT_K);
  const [nationality, setNationality] = useState<Nationality>(Nationality.ANH);
  const [characterPrompt, setCharacterPrompt] = useState<string>("");
  const [secondaryPrompt, setSecondaryPrompt] = useState<string>("");
  const [productPrompt, setProductPrompt] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      onGenerate(imageFile, {
        outfit,
        pose,
        aspectRatio,
        lighting,
        quality,
        nationality,
        characterPrompt,
        secondaryPrompt,
        productPrompt,
      });
    }
  };

  return (
    <LiquidGlass variant="card" className="animated">
      <h2 className="text-2xl font-bold text-purple-300 mb-6 font-orbitron">
        TÙY CHỈNH
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-purple-400">
            1. Tải lên ảnh chân dung của bạn
          </h3>
          <LiquidGlass variant="dock" className="mt-1 flex justify-center">
            <div className="space-y-1 text-center py-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-24 w-24 object-cover rounded-lg border-2 border-slate-500/50"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-slate-300 flex-col items-center gap-1">
                <LiquidGlass
                  variant="button"
                  className="secondary text-xs w-fit"
                >
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span>Tải ảnh lên</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </LiquidGlass>
                <p className="pl-2 self-center">
                  hoặc kéo và thả PNG, JPG tối đa 10MB
                </p>
              </div>
            </div>
          </LiquidGlass>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-purple-400">
            2. Tùy chỉnh chính
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <SelectInput
              label="Trang phục"
              value={outfit}
              onChange={(e) => setOutfit(e.target.value as Outfit)}
              options={OUTFIT_OPTIONS}
            />
            <SelectInput
              label="Tư thế"
              value={pose}
              onChange={(e) => setPose(e.target.value as Pose)}
              options={POSE_OPTIONS}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-purple-400">
            3. Tùy chọn Nâng cao
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <SelectInput
              label="Tỷ lệ khung hình"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              options={ASPECT_RATIO_OPTIONS}
            />
            <SelectInput
              label="Ánh sáng & Tone màu"
              value={lighting}
              onChange={(e) => setLighting(e.target.value as LightingStyle)}
              options={LIGHTING_OPTIONS}
            />
            <SelectInput
              label="Chất lượng ảnh"
              value={quality}
              onChange={(e) => setQuality(e.target.value as ImageQuality)}
              options={QUALITY_OPTIONS}
            />
            <SelectInput
              label="Bối cảnh Quốc gia"
              value={nationality}
              onChange={(e) => setNationality(e.target.value as Nationality)}
              options={NATIONALITY_OPTIONS}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-purple-400">
            4. Tùy chỉnh bằng văn bản (Tùy chọn)
          </h3>
          <div className="space-y-4 pt-2">
            <TextAreaInput
              label="Yêu cầu cho nhân vật chính"
              value={characterPrompt}
              onChange={(e) => setCharacterPrompt(e.target.value)}
              placeholder="VD: đang mỉm cười rạng rỡ, ánh mắt cương nghị..."
            />
            <TextAreaInput
              label="Đối tượng / Nhân vật phụ"
              value={secondaryPrompt}
              onChange={(e) => setSecondaryPrompt(e.target.value)}
              placeholder="VD: một con đại bàng đậu trên vai, một con robot..."
            />
            <TextAreaInput
              label="Sản phẩm phụ"
              value={productPrompt}
              onChange={(e) => setProductPrompt(e.target.value)}
              placeholder="VD: đang cầm một lọ nước hoa, một chiếc điện thoại..."
            />
          </div>
        </div>

        <div>
          <LiquidGlass
            variant="button"
            className="primary w-full animated text-center"
            onClick={() =>
              !isLoading &&
              imageFile &&
              handleSubmit({ preventDefault: () => {} } as React.FormEvent)
            }
          >
            <span className="text-sm font-bold">
              {isLoading ? "ĐANG TẠO..." : "TẠO ẢNH NGAY"}
            </span>
          </LiquidGlass>
        </div>
      </form>
    </LiquidGlass>
  );
};
