import { Routes } from '@angular/router';
import { StoreFrontLayout } from './layouts/store-front-layout/store-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { CartPage } from '../cart/pages/cart-page/cart-page';

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
                path: 'cart',
                component: CartPage
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