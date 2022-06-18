import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BusinessType } from '../../../models/BusinessType';
import { State } from '../../../models/State';
import { City } from '../../../models/City';
import { DataService } from 'src/app/services/data.service';
import { BusinessCategory } from '../../../models/BusinessCategory';
import { Merchant } from '../../../models/Merchant';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss'],
})
export class AddMerchantComponent implements OnInit {
  public categoryForm!: FormGroup;
  newID!: number;
  businessTypes!: BusinessType[];
  businessCategories!: BusinessCategory[];
  states!: State[];
  cities!: City[];
  state!: any;
  city!: any;
  status: string = 'Open';
  validation: boolean = false;

  name = '';
  merchantName = '';
  ssm = '';
  signeeName = '';
  street1 = '';
  street2 = '';

  checkEmail: any;
  checkPhone: any;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.businessTypes = this.dataService.fetchBusinessType();
    this.states = this.dataService.fetchStates();
    this.businessCategories = this.dataService.fetchBusinessCategory();

    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('(^[a-zA-Z][a-zA-Z\\s]{0,50}[a-zA-Z]$)'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(01)[02-46-9]-*[0-9]{7}$|^(01)[1]-*[0-9]{8}$'),
      ]),
      merchantName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!().]+'),
      ]),
      ssm: new FormControl('', [Validators.required]),
      signeeName: new FormControl('', [
        Validators.required,
        Validators.pattern('(^[a-zA-Z][a-zA-Z\\s]{0,50}[a-zA-Z]$)'),
      ]),
      signeeIC: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(([[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))-([0-9]{2})-([0-9]{4})'
        ),
      ]),
      businessType: new FormControl('', [Validators.required]),
      street1: new FormControl('', [Validators.required]),
      street2: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('([0-9])([0-9])([0-9])([0-9])([0-9])'),
      ]),
      businessCategory: new FormControl('', [Validators.required]),
      status: new FormControl(''),
    });
  }

  // For mat-error
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  };

  // Get cities based on state selected
  onStateChange() {
    this.cities = this.dataService.fetchCities(
      this.categoryForm.get('state')?.value.id
    );
    this.state = this.categoryForm.get('state')?.value.name;
  }

  // Get the value of selected cities
  onCityChange(id: any) {
    let city = id.value;
    this.city = city;
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      // generate random ID
      const newID = Math.floor(Math.random() * 1000);

      // check if already id is already exist
      var obj = JSON.parse(localStorage.getItem('merchant-data')!);
      if (obj) {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].id == newID) {
            const newNewID = Math.floor(Math.random() * 1000);
            this.newID = newNewID;
          } else {
            this.newID = newID;
          }
        }
      } else {
        this.newID = newID;
      }

      // compiling address
      const fullAddress =
        this.categoryForm.get('street1')?.value +
        ' ' +
        this.categoryForm.get('street2')?.value +
        ', ' +
        this.categoryForm.get('state')?.value.name +
        ', ' +
        this.categoryForm.get('city')?.value +
        ', ' +
        this.categoryForm.get('postalCode')?.value;

      // declaring data
      let datas: Merchant = {
        id: this.newID,
        name: this.categoryForm.get('name')?.value,
        email: this.categoryForm.get('email')?.value,
        phone: this.categoryForm.get('phone')?.value,
        merchantName: this.categoryForm.get('merchantName')?.value,
        businessType: this.categoryForm.get('businessType')?.value,
        fullAddress: fullAddress,
        businessCategory: this.categoryForm.get('businessCategory')?.value,
        status: this.status,
        ssm: this.categoryForm.get('businessCategory')?.value,
        signeeName: this.categoryForm.get('businessCategory')?.value,
        signeeIC: this.categoryForm.get('businessCategory')?.value,
      };

      // check if already email and phone number is already exist
      const email = this.categoryForm.get('email')?.value;
      const phone = this.categoryForm.get('phone')?.value;
      var obj = JSON.parse(localStorage.getItem('merchant-data')!);
      if (obj) {
        for (var i = 0; i < obj.length; i++) {
          const existedData = {
            email: obj[i].email,
            phone: obj[i].phone,
          };
          this.checkEmail = existedData.email;
          this.checkPhone = existedData.phone;
          if (this.checkEmail == email || this.checkPhone == phone) {
            if (this.checkEmail == email) {
              this.snackBar.open('Email has already been registered.', 'OK', {
                duration: 2000,
              });
              this.validation = false;
              break;
            } else if (this.checkPhone == phone) {
              this.snackBar.open(
                'Phone number has already been registered.',
                'OK',
                {
                  duration: 2000,
                }
              );
              this.validation = false;
              break;
            }
          } else if (this.checkEmail == email && this.checkPhone == phone) {
            this.snackBar.open(
              'Email and phone number has already been registered.',
              'OK',
              {
                duration: 2000,
              }
            );
            this.validation = false;
            break;
          } else if (this.checkEmail != email && this.checkPhone != phone) {
            this.validation = true;
          } else {
            this.validation = true;
          }
        }
      } else {
        this.validation = true;
      }

      if (this.validation == true) {
        this.openDialog(datas);
      }
    } else {
      this.snackBar.open('Please fill in all the details', 'OK', {
        duration: 2000,
      });
    }
  }

  openDialog(datas: any) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: datas,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        this.insertDataIntoLocal(datas);
      } else {
        console.log('Cancelled');
      }
    });
  }

  insertDataIntoLocal(data: any) {
    // Sending data to localStorage
    const localStorageContent = localStorage.getItem('merchant-data');
    let merchantdata = [];
    if (localStorageContent === null) {
      merchantdata = [];
    } else {
      merchantdata = JSON.parse(localStorageContent);
    }

    merchantdata.push(data);
    localStorage.setItem('merchant-data', JSON.stringify(merchantdata));

    this.snackBar.open('Registered', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['manage-merchant']);
  }
}
