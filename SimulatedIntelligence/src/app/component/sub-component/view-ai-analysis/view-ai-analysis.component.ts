import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 
@Component({
  selector: 'app-ai-analysis',
  templateUrl: './view-ai-analysis.component.html',
  styleUrls: ['./view-ai-analysis.component.scss']
})
export class AiAnalysisComponent {
  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<AiAnalysisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 
  closeDialog() {
    this.dialogRef.close();
  }
}