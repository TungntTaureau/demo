// FIX: Import GoogleGenAI and Modality from @google/genai.
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationOptions } from '../types';

// FIX: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateImage = async (
  imageFile: File,
  options: GenerationOptions
): Promise<string[]> => {
  try {
    const { 
        outfit, 
        pose, 
        lighting, 
        quality, 
        nationality, 
        characterPrompt, 
        secondaryPrompt, 
        productPrompt 
    } = options;

    let prompt = `**YÊU CẦU TẠO 3 PHIÊN BẢN ẢNH KHÁC NHAU VỚI CÙNG MỘT CHỦ THỂ.**

**Mệnh lệnh cốt lõi (Bắt buộc tuân thủ 100%):**
- **Khuôn mặt & Tóc:** Giữ lại 100% các đặc điểm trên khuôn mặt, mái tóc, mũi, miệng của người trong ảnh gốc. Không thay đổi bất cứ điều gì khác trên khuôn mặt.
- **Làn da:** Chỉ được phép làm cho nước da sáng và mịn màng hơn theo phong cách "hot boy/hot girl" thời thượng.
- **Chất lượng:** Phải là ${quality} siêu nét, siêu thực, chi tiết sắc nét như được chụp bằng máy ảnh chuyên nghiệp.

**Chi tiết ảnh:**
- **Chủ thể chính:** Một người ${nationality}.
- **Trang phục:** ${outfit}.
- **Tư thế:** ${pose}.
- **Yêu cầu cho nhân vật chính:** ${characterPrompt || 'Như mô tả trong tư thế'}.
- **Bối cảnh:** Nền màu xám hoặc nền mờ chuyên nghiệp trong văn phòng.
- **Ánh sáng:** ${lighting}, tạo cảm giác điện ảnh và ấn tượng.
- **Phong cách:** Chân thực, chuyên nghiệp, mạnh mẽ, điện ảnh.
`;

    if (secondaryPrompt) {
        prompt += `\n- **Đối tượng/Nhân vật phụ:** ${secondaryPrompt}.`;
    }

    if (productPrompt) {
        prompt += `\n- **Sản phẩm phụ:** ${productPrompt}.`;
    }

    prompt += `\n\nHãy tạo ra 3 bức ảnh khác nhau dựa trên các yêu cầu trên, mỗi ảnh có một biến thể nhỏ về góc chụp hoặc bố cục nhưng vẫn tuân thủ nghiêm ngặt các mệnh lệnh cốt lõi.`;


    // FIX: Use 'gemini-2.5-flash-image-preview' model for image editing tasks.
    const model = 'gemini-2.5-flash-image-preview';

    const imagePart = await fileToGenerativePart(imageFile);

    // FIX: Use generateContent for image editing, providing both image and text parts.
    // FIX: Configure responseModalities to receive both IMAGE and TEXT as per guidelines.
    const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                imagePart,
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    
    const images: string[] = [];

    // FIX: Correctly parse the response from generateContent to extract image data.
    if (response.candidates && response.candidates.length > 0) {
        for (const candidate of response.candidates) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                    images.push(imageUrl);
                }
            }
        }
    }

    if (images.length === 0) {
        // FIX: If no image is returned, check the text part of the response for a reason.
        const feedback = response.text?.trim();
        if (feedback) {
            throw new Error(`Không thể tạo ảnh. Phản hồi từ AI: ${feedback}`);
        }
        throw new Error("Không thể tạo ảnh. Vui lòng thử lại với một bức ảnh khác hoặc thay đổi tùy chọn.");
    }
    
    return images;

  } catch (error) {
    console.error("Error generating image:", error);
    // FIX: Add specific error handling for safety-related blocks and other API errors.
    if (error instanceof Error) {
        if (error.message.includes('SAFETY') || error.message.includes('blocked')) {
            throw new Error("Yêu cầu của bạn đã bị chặn vì lý do an toàn. Vui lòng thử một bức ảnh hoặc mô tả khác.");
        }
        if (error.message.startsWith("Không thể tạo ảnh")) {
            throw error;
        }
    }
    throw new Error("Đã xảy ra lỗi trong quá trình tạo ảnh. Vui lòng thử lại sau.");
  }
};