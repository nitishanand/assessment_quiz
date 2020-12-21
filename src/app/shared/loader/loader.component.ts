import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  // source: https://firstclassjs.com/display-a-loader-on-every-http-request-using-interceptor-in-angular-7/
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

}
