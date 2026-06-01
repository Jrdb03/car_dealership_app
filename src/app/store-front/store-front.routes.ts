import { Routes } from '@angular/router';
import { StoreFrontLayout } from './layouts/store-front-layout/store-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayout,
        children: [
            {
                path: '',
                component: HomePage,
            },
            {
                path: '**',
                component: NotFoundPage,
            }
        ],
    },

    {
        path: '**',
        redirectTo: '',
    }
];

export default storeFrontRoutes;