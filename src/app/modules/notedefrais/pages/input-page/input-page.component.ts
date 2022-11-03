import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NotedefraisService } from 'src/app/modules/notedefrais/services/notedefrais.service';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { moment } from 'src/app/shared/modules/material.module';

export const patternDate = "^\\d{2}[/]\\d{2}[/]\\d{4}$";
export const patternAmount = "^([,|.]?[0-9])+$";

export const MESSAGE_SUCCESS = "Successfully created.";
export const MESSAGE_FORM_ERROR = "Form is invalid.";

@Component({
  selector: "app-input-page",
  templateUrl: "./input-page.component.html"
})
export class InputPageComponent implements OnInit {

  @ViewChild(MessageComponent) message: MessageComponent;

  submitted = false;
  inputForm = this.fb.group({
    date: [moment(), Validators.required],
    amount: ["", [Validators.required, Validators.pattern(patternAmount)]]
  });

  constructor(
    private fb: FormBuilder,
    private noteDeFraisService: NotedefraisService,
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
    this.noteDeFraisService.add({
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

}
