import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    //     console.log(feature);
    // }

    constructor(private dss: DataStorageService,
        private authS: AuthService) {}

    onSave() {
        this.dss.storeRecipes()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
             );
    }

    onFetch() {
        this.dss.getRecipes();
    }

    onLogout() {
        this.authS.logout();
    }
}
