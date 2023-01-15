import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'editable-grid-demo';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  dataSource: any[] = [];
  displayedColumns = ['crtName', 'crtHeaders'];
  selection = new SelectionModel<any>(true, []);
  editButtonName = 'EDIT';
  edit = false;

  constructor() { }

  selectRow(row: any) {
    if (!this.edit) {
      this.selection.toggle(row);
    }
  }

  onAdd() {
    const newRow = { crtName: '', crtHeaders: '' };
    this.dataSource = [...this.dataSource, newRow];
    this.selection.toggle(newRow);
    this.edit = true;
    this.editButtonName = 'SAVE';
  }

  onEdit() {
    if (!this.edit) {
      this.edit = true;
      this.editButtonName = 'UPDATE';
    } else {
      this.edit = false;
      this.editButtonName = 'EDIT';
      this.selection.clear();
    }
  }

  onDelete() {
    this.dataSource = this.dataSource.filter(x => !this.selection.selected.includes(x));
    this.selection.clear();
    this.edit = false;
    this.editButtonName = 'EDIT';
  }
}
