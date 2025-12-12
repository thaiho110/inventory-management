
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
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="border-r border-gray-200 dark:border-slate-800">
        <SidebarHeader className="border-b border-gray-200 dark:border-slate-800 py-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <ChartBar className="h-5 w-5 text-white"/>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">IMS</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href || pathname.startsWith(item.href + "/")
                  return(
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      className={`rounded-lg transition-all duration-200 ${
                        isCurrent 
                          ? "bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-medium shadow-sm" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <a href={item.href} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )})}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-200 dark:border-slate-800 py-4">
            <div className="flex items-center justify-center w-full">
              <UserButton showUserInfo />
            </div>
        </SidebarFooter>
      </Sidebar>
  )
}