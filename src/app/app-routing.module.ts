import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SectionAComponent } from './section-a/section-a.component';
import { SectionBComponent } from './section-b/section-b.component';
import { SectionCComponent } from './section-c/section-c.component';
import { SectionDComponent } from './section-d/section-d.component';
import { CarritoComponent } from './carrito/carrito.component';
import { OrdenesComponent } from './ordenes/ordenes.component'; // <-- Make sure to import the OrdenesComponent
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section-a', component: SectionAComponent },
  { path: 'section-b', component: SectionBComponent },
  { path: 'section-c', component: SectionCComponent },
  { path: 'section-d', component: SectionDComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ordenes', component: OrdenesComponent },  // <-- Add this line
  { path: '**', redirectTo: '', pathMatch: 'full' }, // catch-all route to redirect to home
  {path: 'admin', component: AdminInterfaceComponent,canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
