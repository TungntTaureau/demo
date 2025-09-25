import React from "react";
import { LiquidGlass } from "./LiquidGlass";

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <LiquidGlass variant="card" className="mb-8">
        <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          MASTER AI
        </h1>
        <p className="mt-2 text-lg text-slate-300 font-medium">
          BY NGUYEN DUONG
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-slate-200">
          Tạo Ảnh Chuyên Nghiệp - Biến ảnh chân dung của bạn thành những tác
          phẩm nghệ thuật 8K đầy quyền lực.
        </p>
      </LiquidGlass>

      <div className="mt-8">
        <p className="text-slate-200 font-semibold mb-4 text-lg text-center">
          MỜI ANH/ CHỊ JOIN NHÓM ZALO ĐỂ CÙNG NHAU THỰC HÀNH NHÉ
        </p>
        <LiquidGlass
          variant="button"
          className="primary inline-flex animated"
          onClick={() => window.open("https://zalo.me/g/lzcepi774", "_blank")}
        >
          <span className="flex items-center text-base font-bold justify-center">
            <span role="img" aria-label="icons" className="mr-3 text-xl ">
              👉💎
            </span>
            JOIN NHÓM ZALO NGAY
            <span role="img" aria-label="icons" className="ml-3 text-xl">
              💪💰
            </span>
          </span>
        </LiquidGlass>
      </div>
    </header>
  );
};
