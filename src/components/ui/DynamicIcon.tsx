import * as React from 'react';
import {
  FileText,
  ClipboardList,
  Star,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  Target,
  HelpCircle,
  File,
  Image,
  Video,
  Package,
  Paperclip
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

// Icon mapping object
const iconMap: Record<string, React.ComponentType<any>> = {
  FileText,
  ClipboardList,
  Star,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  Target,
  File,
  Image,
  Video,
  Package,
  Paperclip,
};

/**
 * Dynamic Icon Component
 * Renders Lucide icons dynamically based on icon name string
 */
export function DynamicIcon({ name, className, size }: DynamicIconProps) {
  // Get the icon component from the map
  const IconComponent = iconMap[name];
  
  // Fallback to HelpCircle if icon not found
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map, using HelpCircle fallback`);
    return <HelpCircle className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
}
