import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatDialogModule, MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

const materialComponents = [
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
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule {}