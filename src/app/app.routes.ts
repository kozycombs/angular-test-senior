import { Routes } from '@angular/router';
import { VehicleList } from './vehicles/views/vehicle-list/vehicle-list';
import { VehicleDetail } from './vehicles/views/vehicle-detail/vehicle-detail';
import { NotFound } from './not-found/not-found';
import { APP_TITLE } from './constants/globalConsts';
import { VehicleFinance } from './vehicles/views/vehicle-finance/vehicle-finance';

export const routes: Routes = [
  {
    path: '',
    component: VehicleList,
    title: `${APP_TITLE} | All Vehicles`,
  },
  {
    path: 'vehicles/:id',
    component: VehicleDetail,
    title: `${APP_TITLE} | Vehicle`,
  },
  {
    path: 'vehicle-finance/:id',
    component: VehicleFinance,
    title: `${APP_TITLE} | Personalise your finance`,
  },
  { path: '**', component: NotFound, title: `${APP_TITLE} | Not found` },
];
