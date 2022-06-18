import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog-popup/dialog-popup.component';
import { HttpService } from 'src/app/services/http.service';
import { Merchant } from 'src/app/models/Merchant';

export interface Element {
  id: number;
  name: string;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.scss'],
})
export class ManageMerchantComponent implements OnInit {
  public isShowDiv = true;
  text!: string;
  datas: any;

  displayedColumns: string[] = [
    'id',
    'merchantName',
    'email',
    'phone',
    'status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;

  constructor(private dialog: MatDialog, private http: HttpService) {}

  ngOnInit(): void {
    if (localStorage.getItem('merchant-data') == null) {
      console.log('No data');
      this.text = 'No data.';
      this.dataSource = new MatTableDataSource(this.datas);
    } else {
      this.text = 'No data matching the input filter.';
      try {
        // var obj = JSON.parse(localStorage.getItem('merchant-data')!);
        this.datas = this.http.getData();
      } catch (e) {
        console.log('Error', e);
      }
      this.dataSource = new MatTableDataSource(this.datas);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: any) {
    this.dialog.open(DialogPopupComponent, {
      data: element,
    });
  }
}
