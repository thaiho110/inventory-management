
import { BarChart3, ChartBar, Package, Plus, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserButton } from "@stackframe/stack";
import { Toggle } from "@/components/ui/toggle"

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
        }
    ];

export function AppSidebar({pathname = "/"}:{pathname?: string}) {
  
  return (
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChartBar className="h-6 w-6"/>
              <span className="text-3xl font-semibold gap-2">IMS</span>
            </div>
            <Toggle
              aria-label="Toggle bookmark"
              size="sm"
              variant="outline"
              className="rounded-full"
              >
                {

                }
              </Toggle>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="mt-6">
              <SidebarMenu>
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href || pathname.startsWith(item.href + "/")
                  return(
                  <SidebarMenuItem key={item.name} className="hover:bg-gray-300 hover:border rounded-lg">
                    <SidebarMenuButton asChild className={isCurrent ? "border rounded-lg bg-purple-300 " : ""}>
                      <a href={item.href}>
                        <item.icon />
                        <span className="font-medium">{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )})}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center justify-between">
                        <UserButton showUserInfo/>
            </div>
        </SidebarFooter>
      </Sidebar>
  )
}