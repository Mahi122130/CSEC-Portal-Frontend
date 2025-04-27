// src/components/ui/toast.tsx
"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "relative w-full flex items-center p-4 rounded-lg shadow-lg border",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        destructive: "bg-red-100 border-red-200 text-red-800",
        success: "bg-green-100 border-green-200 text-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  title,
  description,
  variant,
  onClose,
}: ToastProps) {
  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="flex-shrink-0">
        {variant === "destructive" ? (
          <AlertCircle className="h-5 w-5 text-red-600" />
        ) : variant === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <div className="h-5 w-5" />
        )}
      </div>
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium">{title}</h3>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
