import { Routes } from '@angular/router';
import { CollectionDetail } from './pages/collection-detail/collection-detail';
import { CollectionItemDetail } from './pages/collection-item-detail/collection-item-detail';

export const routes: Routes = [{
    path: 'home',
    component: CollectionDetail
}, {
    path: 'item',
    component: CollectionItemDetail
}];
