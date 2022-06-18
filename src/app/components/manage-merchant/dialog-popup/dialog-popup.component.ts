import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss'],
})
export class DialogPopupComponent implements OnInit {
  id!: number;
  name!: string;
  email!: string;
  phone!: number;
  merchantName!: string;
  businessType!: string;
  fullAddress!: string;
  businessCategory!: string;
  ssm!: string;
  signeeName!: string;
  signeeIC!: string;
  status!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.name = this.data.name;
    this.email = this.data.email;
    this.phone = this.data.phone;
    this.merchantName = this.data.merchantName;
    this.ssm = this.data.ssm;
    this.signeeName = this.data.signeeName;
    this.signeeIC = this.data.signeeIC;
    this.businessType = this.data.businessType;
    this.fullAddress = this.data.fullAddress;
    this.businessCategory = this.data.businessCategory;
    this.status = this.data.status;
  }
}
