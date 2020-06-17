import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatDialogModule, MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

@NgModule({
  exports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class MaterialModule {}