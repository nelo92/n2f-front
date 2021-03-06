import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { NotedefraisService } from 'src/app/services/notedefrais.service';
import { MessageComponent } from 'src/app/components/message/message.component';
import { moment } from 'src/app/modules/material.module';
import { AuthService } from 'src/app/services/auth.service';

export const patternDate = "^\\d{2}[/]\\d{2}[/]\\d{4}$";
export const patternAmount = "^([,|.]?[0-9])+$";

export const MESSAGE_SUCCESS = "Successfully created.";
export const MESSAGE_FORM_ERROR = "Form is invalid.";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html"
})
export class InputComponent implements OnInit {

  @ViewChild(MessageComponent) message: MessageComponent;

  submitted = false;
  inputForm = this.fb.group({
    date: [moment(), Validators.required],
    amount: ["", [Validators.required, Validators.pattern(patternAmount)]]
  });

  constructor(
    private fb: FormBuilder,
    private ndfService: NotedefraisService,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onInputDate(e: MatDatepickerInputEvent<Date>) { }

  onChangeDate(e: MatDatepickerInputEvent<Date>) { }

  onReset() {
    this.inputForm.reset();
    this.submitted = false;
    this.inputForm.get("date").setValue(moment());
  }

  onSubmit() {
    const user = this.authService.userData;
    this.submitted = true;
    if (this.inputForm.invalid) {
      this.message.show_error(MESSAGE_FORM_ERROR);
      return;
    }
    let d = this.inputForm.get("date").value.toDate();
    d.setHours(12, 0, 0, 0);
    this.ndfService.add({
      user_uid: user.uid,
      date: d,
      amount: this.inputForm.get("amount").value.replace(",", ".")
    });
    this.onReset();
    this.message.show_info(MESSAGE_SUCCESS);
  }

  get date() {
    return this.inputForm.get("date");
  }
  get amount() {
    return this.inputForm.get("amount");
  }
  get controls() {
    return this.inputForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.inputForm.controls[controlName].hasError(errorName);
  };

  // formartDate(d) {
  //   let date = ("0" + d.getDate()).slice(-2);
  //   let month = ("0" + (d.getMonth() + 1)).slice(-2);
  //   let year = d.getFullYear();
  //   return date + "/" + month + "/" + year;
  // }

}
