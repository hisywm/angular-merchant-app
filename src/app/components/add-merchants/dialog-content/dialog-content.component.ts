import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecaptchaComponent, RecaptchaErrorParameters } from 'ng-recaptcha';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
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

  FormGroup: FormGroup | any;
  recComp: RecaptchaComponent | any;

  hidden: boolean = true;
  result!: boolean;

  localStorageID: any;

  text: string = 'This field is required.';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: AppService,
    private snackBar: MatSnackBar
  ) {}

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

    this.FormGroup = this.formBuilder.group({
      checkBox1: [false, Validators.requiredTrue],
      checkBox2: [false, Validators.requiredTrue],
      checkBox3: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],
    });
  }

  async getToken(captchaResponse: string) {
    console.log(`Resolved captcha with response:` + captchaResponse);
    await this.sendToken(captchaResponse);
  }

  public sendToken(captchaResponse: string) {
    this.service.sendToken(captchaResponse).subscribe((res) => {
      if (res.success == true) {
        this.result = true;
        this.FormGroup.valid = true;
      } else {
        this.result = false;
        this.FormGroup.valid = true;
      }
    });
  }

  // For mat-error
  public hasError = (controlName: string, errorName: string) => {
    return this.FormGroup.controls[controlName].hasError(errorName);
  };

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
