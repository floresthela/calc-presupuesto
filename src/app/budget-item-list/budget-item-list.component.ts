import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})


export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<any> = new EventEmitter<UpdateEvent>();
  @Output() update: EventEmitter<any> = new EventEmitter<UpdateEvent>();

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem){
    //mostrar modal pa editar
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // result tiene valor
      if(result){
        this.update.emit({
          old: item,
          new: result
        })
      }
    })
  }

}

export interface UpdateEvent {
  old : BudgetItem;
  new : BudgetItem;
}