import { AppLayout } from '@/components/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/pages/App';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },  
]);

export const AppDefaultRouterProvider = () => <RouterProvider router={router} />
