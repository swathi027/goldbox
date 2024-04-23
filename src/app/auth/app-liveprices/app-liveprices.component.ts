import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-app-liveprices',
  templateUrl: './app-liveprices.component.html',
  styleUrls: ['./app-liveprices.component.scss']
})
export class AppLivepricesComponent implements OnDestroy {
  livesellprice24: any = 0;
  livesellprice22: any = 0;
  private destroy$ = new Subject<void>();
  livesellprice24color: string = '#ffff';
  livesellprice22color: string = '#ffff';
  previousLivesellprice24: number = 0;
  previousLivesellprice22: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getliveprices();
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getliveprices();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getliveprices() {
    this.api.liveprice().subscribe((res: any) => {
      const currentLivesellprice24 = res.carat24.message.sell_price_per_gram;
      const currentLivesellprice22 = res.carat22.message.sell_price_per_gram;
     console.log(res)
      this.livesellprice24color = this.getTextColor(
        currentLivesellprice24,
        this.previousLivesellprice24
      );
      this.livesellprice22color = this.getTextColor(
        currentLivesellprice22,
        this.previousLivesellprice22
      );

      this.livesellprice24 = currentLivesellprice24;
      this.livesellprice22 = currentLivesellprice22;

      this.previousLivesellprice24 = currentLivesellprice24;
      this.previousLivesellprice22 = currentLivesellprice22;
    });
  }

  getTextColor(currentPrice: number, previousPrice: number): string {
    if (currentPrice > previousPrice) {
      return 'red';
    } else if (currentPrice < previousPrice) {
      return 'green';
    } else {  
      return 'black';
    }
  }
}
