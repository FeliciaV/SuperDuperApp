import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { DataStorageService } from '../shared/data-storage.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        RecipeService,
        AuthService,
        DataStorageService
    ],
})
export class CoreModule {

}
