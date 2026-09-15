import { Routes } from '@angular/router';
import { ProductsPageComponent } from './components/products-page.component';

export const routes: Routes = [
	{
		path: '', component: ProductsPageComponent
	},
	{
		path: '**', redirectTo: ''
	},
];
