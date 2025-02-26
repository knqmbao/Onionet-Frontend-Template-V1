import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function InventoryPage() {
  return (
    <div className="w-screen h-screen  [--header-height:calc(theme(spacing.14))]">
      {/* border-2 border-red-500 */}
      <SidebarProvider className="flex flex-col w-full h-full">
        {/* Sticky header */}
        <SiteHeader />
        <div className="flex flex-1 w-full h-full">
          {/* sidebar */}
          <AppSidebar />
          {/* main window right */}
          <SidebarInset className="w-full h-full border-2">
            <div className="flex flex-1 flex-col gap-4 p-4 w-full h-full">
              <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min w-full " />
            </div>
          </SidebarInset>

        </div>
      </SidebarProvider>
    </div>
  );
}

