import { Outfit, Pose, AspectRatio, LightingStyle, ImageQuality, Nationality } from './types';

export const OUTFIT_OPTIONS = [
  // Nữ
  { value: Outfit.BOSS_MY_PHAM, label: 'Nữ Doanh nhân (Boss mỹ phẩm)' },
  { value: Outfit.DOANH_NHAN_NU_VEST, label: 'Nữ Doanh nhân (Vest)' },
  // Nam
  { value: Outfit.CHU_TICH_HDQT, label: 'Nam Chủ tịch HĐQT' },
  { value: Outfit.DOANH_NHAN_NAM_SUIT, label: 'Nam Doanh nhân (Suit)' },
  // Sáng tạo
  { value: Outfit.SIEU_ANH_HUNG, label: 'Siêu anh hùng' },
  { value: Outfit.HIEP_SI, label: 'Hiệp sĩ' },
  { value: Outfit.PHI_HANH_GIA, label: 'Phi hành gia' },
  { value: Outfit.NHA_PHIEU_LUU, label: 'Nhà phiêu lưu' },
  { value: Outfit.CYBERPUNK, label: 'Cyberpunk' },
];

export const POSE_OPTIONS = [
  { value: Pose.NHIN_THANG, label: 'Nhìn thẳng chuyên nghiệp' },
  { value: Pose.TU_TIN, label: 'Tự tin' },
  { value: Pose.QUYEN_LUC, label: 'Quyền lực' },
];

export const ASPECT_RATIO_OPTIONS = [
  { value: AspectRatio.PORTRAIT_9_16, label: 'Dọc (9:16)' },
  { value: AspectRatio.PORTRAIT_3_4, label: 'Chân dung (3:4)' },
  { value: AspectRatio.LANDSCAPE_16_9, label: 'Ngang (16:9)' },
];

export const LIGHTING_OPTIONS = [
  { value: LightingStyle.DEFAULT, label: 'Tự nhiên' },
  { value: LightingStyle.XANH_DA_TROI, label: 'Ánh xanh da trời' },
  { value: LightingStyle.ANH_TIM, label: 'Ánh tím' },
  { value: LightingStyle.ANH_DO, label: 'Ánh đỏ' },
  { value: LightingStyle.NEON, label: 'Neon' },
];

export const QUALITY_OPTIONS = [
    { value: ImageQuality.EIGHT_K, label: '8K (Siêu nét)' },
    { value: ImageQuality.FOUR_K, label: '4K (Rất nét)' },
];

export const NATIONALITY_OPTIONS = [
    { value: Nationality.DEFAULT, label: 'Mặc định (Việt Nam)' },
    { value: Nationality.HAN_QUOC, label: 'Hàn Quốc' },
    { value: Nationality.NHAT_BAN, label: 'Nhật Bản' },
    { value: Nationality.THAI_LAN, label: 'Thái Lan' },
    { value: Nationality.ANH, label: 'Anh' },
    { value: Nationality.PHAP, label: 'Pháp' },
    { value: Nationality.UC, label: 'Úc' },
    { value: Nationality.AN_DO, label: 'Ấn Độ' },
    { value: Nationality.NGA, label: 'Nga' },
];
