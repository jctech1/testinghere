import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SectionAComponent } from './section-a/section-a.component';
import { SectionBComponent } from './section-b/section-b.component';
import { SectionCComponent } from './section-c/section-c.component';
import { SectionDComponent } from './section-d/section-d.component';
import { ProductService} from './services/product-service.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment.prod';
import { RegistrationComponent } from './registration/registration.component';
//import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SectionAComponent,
    SectionBComponent,
    SectionCComponent,
    SectionDComponent,
    RegistrationComponent,
    CarritoComponent,
    OrdenesComponent,
    WishlistComponent,
    AdminInterfaceComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
