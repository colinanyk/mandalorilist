import { Component } from '@angular/core';
import {faHotTub} from "@fortawesome/free-solid-svg-icons/faHotTub";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mandalorilist';
  faHotTub = faHotTub;
}
