// src/components/ui/use-toast.tsx
"use client";

import * as React from "react";
import { Toast, ToastProps as OriginalToastProps } from "@/components/ui/toast";

interface ToastProps extends OriginalToastProps {
  id: string;
}

interface ToastContextProps {
  toast: (props: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextProps>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const toastId = Date.now().toString();
    const duration = props.duration || 3000;
    
    setToasts((current) => [...current, { ...props, id: toastId }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== toastId));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}