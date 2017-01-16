import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ModelStorageInterface } from '../../services/storage/model-storage.interface';

@Component({
  selector: 'app-load-model-dialog',
  template: `
    <p>Load Model</p>
    <p>
      <label>
        Select a model to load
      </label>
    </p>
    <ul>
      <li *ngFor="let model of models | async" 
          (click)="select(model)" 
          [ngClass]="model === selected ? 'selected' : ''">
            {{model}}
      </li>
    </ul>
    <hr>
    <p> 
      <button md-button (click)="dialogRef.close(selected)">LOAD</button> 
      <button md-button (click)="dialogRef.close()">CANCEL</button> 
    </p>
  `,
  styleUrls: ['./load-model-dialog.component.css']
})
export class LoadModelDialogComponent implements OnInit {
  models;
  selected;
  items;

  constructor(
    @Optional() public dialogRef: MdDialogRef<LoadModelDialogComponent>,
    private modelStorageService: ModelStorageInterface) {
  }

  ngOnInit() {
    this.models = this.modelStorageService.getModels();
  }

  select(model) {
    this.selected = model;
  }

}
