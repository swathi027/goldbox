import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  tablePageSize: BehaviorSubject<tablePageSize> =
    new BehaviorSubject<tablePageSize>({ skip: 0, limit: 10, pageSize: 10 });

  calculatePageSize: BehaviorSubject<pageSizeCal> =
    new BehaviorSubject<pageSizeCal>({
      totalData: 0,
      pageSize: 10,
      tableData: [],
      serialNumberArray: [],
    });
  changePagesize: BehaviorSubject<pageSize> = new BehaviorSubject<pageSize>({
    pageSize: 10,
  });
}
export interface pageSelection {
  skip: number;
  limit: number;
}
export interface tablePageSize {
  skip: number;
  limit: number;
  pageSize: number;
}
export interface pageSizeCal {
  totalData: number;
  pageSize: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: Array<any>;
  serialNumberArray: Array<number>;
}
export interface pageSize {
  pageSize: number;
}
