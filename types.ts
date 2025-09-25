// Defines the available options for generating an image.

export enum Outfit {
  BOSS_MY_PHAM = 'Nữ Doanh nhân (Boss mỹ phẩm)',
  DOANH_NHAN_NU_VEST = 'Nữ Doanh nhân (Vest)',
  CHU_TICH_HDQT = 'Nam Chủ tịch HĐQT',
  DOANH_NHAN_NAM_SUIT = 'Nam Doanh nhân (Suit)',
  SIEU_ANH_HUNG = 'Siêu anh hùng',
  HIEP_SI = 'Hiệp sĩ',
  PHI_HANH_GIA = 'Phi hành gia',
  NHA_PHIEU_LUU = 'Nhà phiêu lưu',
  CYBERPUNK = 'Cyberpunk',
}

export enum Pose {
  NHIN_THANG = 'Nhìn thẳng chuyên nghiệp',
  TU_TIN = 'Tự tin',
  QUYEN_LUC = 'Quyền lực',
}

export enum AspectRatio {
  PORTRAIT_9_16 = '9:16',
  PORTRAIT_3_4 = '3:4',
  LANDSCAPE_16_9 = '16:9',
}

export enum LightingStyle {
  DEFAULT = 'Tự nhiên',
  XANH_DA_TROI = 'Ánh xanh da trời',
  ANH_TIM = 'Ánh tím',
  ANH_DO = 'Ánh đỏ',
  NEON = 'Neon',
}

export enum ImageQuality {
  EIGHT_K = '8K',
  FOUR_K = '4K',
}

export enum Nationality {
  DEFAULT = 'Việt Nam',
  HAN_QUOC = 'Hàn Quốc',
  NHAT_BAN = 'Nhật Bản',
  THAI_LAN = 'Thái Lan',
  ANH = 'Anh',
  PHAP = 'Pháp',
  UC = 'Úc',
  AN_DO = 'Ấn Độ',
  NGA = 'Nga',
}

export interface GenerationOptions {
  outfit: Outfit;
  pose: Pose;
  aspectRatio: AspectRatio;
  lighting: LightingStyle;
  quality: ImageQuality;
  nationality: Nationality;
  characterPrompt?: string;
  secondaryPrompt?: string;
  productPrompt?: string;
}