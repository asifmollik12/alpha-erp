import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <AppSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </>
  );
}
