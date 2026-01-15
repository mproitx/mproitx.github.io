import { 
  FileText, 
  ClipboardList, 
  Star, 
  BookOpen, 
  Brain, 
  Calculator, 
  CheckCircle, 
  Target,
  File as FileIcon,
  Image as ImageIcon,
  Video,
  Package,
  Paperclip
} from 'lucide-react';
import type { CategoryInfo, ContentCategory } from '@/types/types';

// Category Information with Hindi names and Lucide icons
export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'notes',
    name: 'नोट्स',
    icon: 'FileText',
    description: 'विस्तृत अध्ययन नोट्स',
    color: 'from-slate-600 to-slate-700',
  },
  {
    id: 'pyq',
    name: 'पिछले वर्ष के प्रश्न',
    icon: 'ClipboardList',
    description: 'पिछले वर्षों के प्रश्न पत्र',
    color: 'from-slate-700 to-slate-800',
  },
  {
    id: 'important_questions',
    name: 'महत्वपूर्ण प्रश्न',
    icon: 'Star',
    description: 'परीक्षा के लिए महत्वपूर्ण प्रश्न',
    color: 'from-gray-600 to-gray-700',
  },
  {
    id: 'reference_books',
    name: 'संदर्भ पुस्तकें',
    icon: 'BookOpen',
    description: 'अतिरिक्त अध्ययन सामग्री',
    color: 'from-gray-700 to-gray-800',
  },
  {
    id: 'mind_maps',
    name: 'माइंड मैप्स',
    icon: 'Brain',
    description: 'विज़ुअल लर्निंग मैप्स',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'formulas',
    name: 'फॉर्मूला',
    icon: 'Calculator',
    description: 'महत्वपूर्ण फॉर्मूला और समीकरण',
    color: 'from-zinc-600 to-zinc-700',
  },
  {
    id: 'mcq_tests',
    name: 'MCQ टेस्ट',
    icon: 'CheckCircle',
    description: 'बहुविकल्पीय प्रश्न परीक्षण',
    color: 'from-zinc-700 to-zinc-800',
  },
  {
    id: 'iit_jee_questions',
    name: 'IIT-JEE प्रश्न',
    icon: 'Target',
    description: 'उन्नत स्तर के प्रश्न',
    color: 'from-gray-600 to-gray-800',
  },
];

// Class options
export const CLASSES = [8, 9, 10, 11, 12];

// Common subjects
export const SUBJECTS = {
  8: ['गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'अंग्रेजी', 'हिंदी'],
  9: ['गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'अंग्रेजी', 'हिंदी'],
  10: ['गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'अंग्रेजी', 'हिंदी'],
  11: ['भौतिकी', 'रसायन विज्ञान', 'गणित', 'जीव विज्ञान', 'अंग्रेजी'],
  12: ['भौतिकी', 'रसायन विज्ञान', 'गणित', 'जीव विज्ञान', 'अंग्रेजी'],
};

// Get category info by ID
export function getCategoryInfo(categoryId: ContentCategory): CategoryInfo | undefined {
  return CATEGORIES.find(cat => cat.id === categoryId);
}

// Get category name
export function getCategoryName(categoryId: ContentCategory): string {
  return getCategoryInfo(categoryId)?.name || categoryId;
}

// File type icon names (Lucide icon names)
export const FILE_TYPE_ICONS: Record<string, string> = {
  'application/pdf': 'File',
  'image/jpeg': 'Image',
  'image/jpg': 'Image',
  'image/png': 'Image',
  'image/webp': 'Image',
  'video/mp4': 'Video',
  'application/zip': 'Package',
  'application/x-zip-compressed': 'Package',
};

// Get file type icon name
export function getFileTypeIcon(fileType: string): string {
  return FILE_TYPE_ICONS[fileType] || 'Paperclip';
}

// Format file size
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'N/A';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'आज';
  if (diffInDays === 1) return 'कल';
  if (diffInDays < 7) return `${diffInDays} दिन पहले`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} सप्ताह पहले`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} महीने पहले`;
  
  return date.toLocaleDateString('hi-IN');
}

// Format time duration (seconds to mm:ss)
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Calculate percentage
export function calculatePercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

// Get grade based on percentage
export function getGrade(percentage: number): { grade: string; color: string } {
  if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
  if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
  if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600' };
  if (percentage >= 60) return { grade: 'B', color: 'text-blue-500' };
  if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600' };
  if (percentage >= 40) return { grade: 'D', color: 'text-orange-600' };
  return { grade: 'F', color: 'text-red-600' };
}

// Compress image before upload
export async function compressImage(file: File, maxSizeMB = 1): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Resize to max 1080p
        const maxDimension = 1080;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Try different quality levels
        let quality = 0.8;
        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Compression failed'));
                return;
              }
              
              const sizeMB = blob.size / (1024 * 1024);
              
              if (sizeMB <= maxSizeMB || quality <= 0.1) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                quality -= 0.1;
                tryCompress();
              }
            },
            'image/webp',
            quality
          );
        };
        
        tryCompress();
      };
      img.onerror = () => reject(new Error('Image load failed'));
    };
    reader.onerror = () => reject(new Error('File read failed'));
  });
}

// Validate file name (only English letters and numbers)
export function validateFileName(fileName: string): boolean {
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  return /^[a-zA-Z0-9_-]+$/.test(nameWithoutExt);
}

// Sanitize file name
export function sanitizeFileName(fileName: string): string {
  const ext = fileName.substring(fileName.lastIndexOf('.'));
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  const sanitized = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '_');
  return sanitized + ext;
}
