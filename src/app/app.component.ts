import { Component } from '@angular/core';
import { ScreensizeService } from 'src/app/services/screensize.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'app';
  isDesktop: boolean;

  constructor(private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) window.location.reload();
      this.isDesktop = isDesktop;
    });

  }
}
