"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/navbar/Navbar";
import ProtectedRoute from "@/components/features/Auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex justify-center min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-x-hidden">
            <div className="flex items-center space-x-1">
              <SidebarTrigger />
              <Navbar />
            </div>
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}