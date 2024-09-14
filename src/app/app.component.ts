import { NgxSpinnerModule } from 'ngx-spinner';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/additions/navbar/navbar.component";
import { FooterComponent } from "./layout/additions/footer/footer.component";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent ,NgxSpinnerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private _NgxSpinnerService:NgxSpinnerService){}
  ngOnInit() {
    /** spinner starts on init */
    this._NgxSpinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._NgxSpinnerService.hide();
    }, 5000);
  }
  title = 'app5';
}
