import { LucideIcon } from "lucide-react";

export type ToolCategory = "ORGANIZE PDF" | "OPTIMIZE PDF" | "CONVERT TO PDF" | "CONVERT FROM PDF" | "EDIT PDF" | "PDF SECURITY";

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  color: string;
  multipleFiles?: boolean;
  acceptedTypes?: string;
  apiEndpoint: string;
}
