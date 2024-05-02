import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
declare var $:any;

interface buttonsData {
  btn: string;
  icon: string;
}

@Component({
  selector: 'app-ngbd-buttons',
  standalone: true,
  templateUrl: 'buttons.page.html',
  imports: [
    FormsModule, ReactiveFormsModule , NgFor
  ]
})
export class NgbdButtonsPage implements OnInit {

  public checkboxGroupForm: UntypedFormGroup = Object.create(null);

  public radioGroupForm: UntypedFormGroup = Object.create(null);

  constructor(private formBuilder: UntypedFormBuilder) {
    if (StorageService.readStorage("reloadPage")){
      document.location.reload();
      StorageService.deleteStorage("reloadPage")
    }
  }

  buttonsdata: buttonsData[] = [
    {
      btn: 'primary',
      icon: 'check',
    },
    {
      btn: 'secondary',
      icon: 'heart',
    },
    {
      btn: 'success',
      icon: 'send',
    },
    {
      btn: 'info',
      icon: 'envelope',
    },
    {
      btn: 'warning',
      icon: 'inbox',
    },
    {
      btn: 'danger',
      icon: 'bell',
    },
  ];

  model = {
    left: true,
    middle: false,
    right: false,
  };

  model1 = 1;

  ngOnInit() {
    this.checkboxGroupForm = this.formBuilder.group({
      left: true,
      middle: false,
      right: false,
    });

    this.radioGroupForm = this.formBuilder.group({
      model: 1,
    });
  }

}
