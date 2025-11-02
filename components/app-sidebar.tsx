
import { BarChart3, ChartBar, Package, Plus, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigation = [
        {
            name: "Dashboard",
            href: "/dashboard",

            icon: BarChart3
        },
        {
            name: "Inventory",
            href: "/inventory",

            icon: Package
        },
        {
            name: "Products",
            href: "/products",

            icon: Plus
        },
        {
            name: "Settings",
            href: "/settings",

            icon: Settings
        }
    ];

export function AppSidebar({pathname = "/"}:{pathname?: string}) {
  return (
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas" >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center justify-between">
                <ChartBar className="h-6 w-6"/>
                <span className="text-2xl">IMS</span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-6">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href || pathname.startsWith(item.href + "/")
                  return(
                  <SidebarMenuItem key={item.name} className="hover:bg-gray-300 hover:border rounded-lg">
                    <SidebarMenuButton asChild className={isCurrent ? "border rounded-lg bg-purple-300 " : ""}>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )})}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}