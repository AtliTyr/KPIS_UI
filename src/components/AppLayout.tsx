// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { AppSidebar } from '@/components/AppSidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet } from 'react-router';
import { ScrollArea } from './new_ui/scrollarea';
export const AppLayout = () => {
    return (
        // <SidebarProvider>
        <div className="flex h-screen">
            <AppSidebar />
            <ScrollArea className='w-full'>
                <main className="flex-1 px-5 py-3 overflow-y-auto">
                    <Outlet />
                </main>
            </ScrollArea>
        </div>
        // </SidebarProvider>
    );
};
