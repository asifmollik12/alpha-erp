'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart2, FolderKanban } from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/applications', label: 'Applications', icon: FolderKanban },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
];

const headerAvatar = PlaceHolderImages.find(img => img.id === 'header-avatar');

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <>
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-2.5 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">VisaFlow ERP</span>
                </Link>
            </SidebarHeader>
            <Separator className="group-data-[collapsible=icon]:hidden" />
            <SidebarContent>
                <SidebarMenu>
                    {links.map((link) => (
                        <SidebarMenuItem key={link.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
                                tooltip={{children: link.label, side: 'right', align: 'center'}}
                            >
                                <Link href={link.href}>
                                    <link.icon />
                                    <span>{link.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <Separator />
            <SidebarFooter>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="w-full justify-start gap-2 h-12 px-2 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:self-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage data-ai-hint="person face" src={headerAvatar?.imageUrl} alt="User Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                     <div className="text-left group-data-[collapsible=icon]:hidden">
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                     </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
        </>
    );
}
