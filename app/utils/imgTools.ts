
// 预定义的策略配置 - 按压缩体积从大到小排列
const IMAGE_STRATEGIES = {
  // 超大高清图：原始质量，不压缩或轻微压缩，用于需要极高画质的场景
  ORIGINAL_HD: {
    resize: 'w_1920,m_lfit',
    quality: 95,
    format: 'webp' as const,
    autoOrient: true
  },

  // 高质量大图：优质画质，中等压缩，适合PC端详情页
  HIGH_QUALITY: {
    resize: 'w_1200,m_lfit',
    quality: 85,
    format: 'webp' as const,
    autoOrient: true
  },

  // 标准清晰图：良好画质，标准压缩，通用场景
  STANDARD: {
    resize: 'w_800,m_lfit',
    quality: 80,
    format: 'webp' as const,
    autoOrient: true
  },

  // 中等压缩图：可接受的画质，适合移动端
  MEDIUM: {
    resize: 'w_500,m_lfit',
    // quality: 75,
    format: 'webp' as const,
    autoOrient: true
  },

  // 高压缩小图：体积小，适合列表缩略图
  COMPACT: {
    resize: 'm_fill,w_300,h_300',
    quality: 75,
    format: 'webp' as const
  },

  // 极小缩略图：极致压缩，用于头像等小尺寸图片
  THUMBNAIL: {
    resize: 'm_fill,w_150,h_150',
    quality: 70,
    format: 'webp' as const
  },

  // 极速加载图：最低质量，最小体积，网络条件差时使用
  MINIMAL: {
    resize: 'w_400,m_lfit',
    quality: 60,
    format: 'webp' as const
  }
} as const;


// 类型定义
type ImageStrategyKey = keyof typeof IMAGE_STRATEGIES;

// // 按体积大小排序的策略列表（从大到小）
// const STRATEGY_BY_SIZE: ImageStrategyKey[] = [
//   'ORIGINAL_HD',    // 最大体积，最高质量
//   'HIGH_QUALITY',   // ↓
//   'STANDARD',       // ↓
//   'MEDIUM',         // ↓
//   'COMPACT',        // ↓
//   'THUMBNAIL',      // ↓
//   'MINIMAL'         // 最小体积，最低质量
// ];

const STRATEGY_BY_SIZE = {
  STANDARD: IMAGE_STRATEGIES.STANDARD,
  MEDIUM: IMAGE_STRATEGIES.MEDIUM,
  COMPACT: IMAGE_STRATEGIES.COMPACT,
}

const getImgSrc = (src: string, params?: { resize?: string, format?: string, quality?: number, default?: keyof typeof STRATEGY_BY_SIZE }): string => {
  if (!src) {
    return '';
  }
  if (src.startsWith('http://') || src.startsWith('https://')) {
    if (src.includes('cdn')) {
      if (src.includes('x-oss-process=image')) {
        // 已经有处理参数，直接返回
        return src;
      } else {
        // 没有处理参数，添加默认的中等压缩策略
        // const strategyKey = IMAGE_STRATEGIES.MEDIUM;
        let srcT = `${src}?x-oss-process=image/auto-orient,1`;
        if (params.default) {
          srcT += `/w_500,m_lfit`;
        } else {
          if (params.resize) {
            srcT += `/${params.resize}`;
          }
          if (params.format) {
            srcT += `/format,${params.format}`;
          }
          if (params.quality) {
            srcT += `/quality,Q_${params.quality}`;
          }
        }

        return srcT;
      }
    }
  } else {
    return src;
  }
}

const getImgCdnSrc = (src:string)=>{
  if (!src) {
    return '';
  }
  return `https://cdn.incustom.com/upload/web/${src}`;
}

export { getImgSrc,getImgCdnSrc };