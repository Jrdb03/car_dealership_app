import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';



export const adminDashboardRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardLayout,
        canMatch: [IsAdminGuard],
    }
]

export default adminDashboardRoutes;