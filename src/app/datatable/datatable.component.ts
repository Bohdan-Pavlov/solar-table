import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { DatatableComponent as NgxDatatableComponent } from '@swimlane/ngx-datatable';

import { RowModel } from 'src/app/interfaces';

@Component({
	selector: 'app-datatable',
	templateUrl: './datatable.component.html',
	styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit  {
	@ViewChild('myTable', { static: true }) table!: NgxDatatableComponent;
	@ViewChild('headerCell', { static: true }) headerCell!: TemplateRef<any>;
	@ViewChild('editableCell', { static: true }) editableCell!: TemplateRef<any>;
	@ViewChild('timeCell', { static: true }) timeCell!: TemplateRef<any>;
	@ViewChild('quantityCell', { static: true }) quantityCell!: TemplateRef<any>;
	@ViewChild('annualCell', { static: true }) annualCell!: TemplateRef<any>;
	@ViewChild('settingsCell', { static: true }) settingsCell!: TemplateRef<any>;
  @ViewChild('calculateSummerCell', { static: true }) calculateSummerCell!: TemplateRef<any>;
  @ViewChild('calculateWinterCell', { static: true }) calculateWinterCell!: TemplateRef<any>;


	public columns: TableColumn[] = [];
	public rows: RowModel[] = [];
	public isModalOpened: boolean = false;
	public currentRow!: RowModel;
	public tableHeader: string = 'Daily Average Consumption';
	protected readonly ColumnMode = ColumnMode;

  constructor( private cd: ChangeDetectorRef) {
  }

	public ngOnInit(): void {
		this.columns = [
			{
				name: 'Appliances',
				prop: 'appliances',
				cellTemplate: this.editableCell,
				minWidth: 150,
				summaryFunc: () => {
					return 'Total';
				},
			},
			{
				name: 'Qty',
				prop: 'qty',
				cellTemplate: this.quantityCell,
				summaryFunc: () => null,
			},
			{
				name: 'Power (W)',
				prop: 'power',
				cellTemplate: this.editableCell,
				summaryFunc: () => null,
			},
			{
				name: 'Time (hrs)',
				prop: 'timeSummer',
				headerTemplate: this.headerCell,
				cellTemplate: this.timeCell,
				summaryFunc: () => null,
			},
			{
				name: 'Energy (kWh)',
				prop: 'energySummer',
				headerTemplate: this.headerCell,
				cellTemplate: this.calculateSummerCell,
				summaryFunc: (cells: number[]) => {
					return cells.reduce((a: number, b: number) => a + b, 0).toFixed(2) + ' kWh';
				},
			},
			{
				name: 'Time (hrs)',
				prop: 'timeWinter',
				headerTemplate: this.headerCell,
				cellTemplate: this.timeCell,
				summaryFunc: () => null,
			},
			{
				name: 'Energy (kWh)',
				prop: 'energyWinter',
				headerTemplate: this.headerCell,
				cellTemplate: this.calculateWinterCell,
				summaryFunc: (cells: number[]) => {
					return cells.reduce((a: number, b: number) => a + b, 0).toFixed(2) + 'kWh';
				},
			},
			{
				name: 'Energy (hrs)',
				prop: 'energyAnnual',
				headerTemplate: this.headerCell,
				cellTemplate: this.annualCell,
				summaryFunc: (cells: number[]) => {
					return cells.reduce((a: number, b: number) => a + b, 0).toFixed(2) + 'kWh';
				},
			},
			{
				name: '',
				prop: 'settings',
				cellTemplate: this.settingsCell,
				maxWidth: 50,
				summaryFunc: () => null,
			},
		];

		this.rows = [
			{
				appliances: 'Dishwasher',
				qty: 1,
				power: 1200,
				timeSummer: 1,
				energySummer: 0.6,
				timeWinter: 1,
				energyWinter: 0.6,
				energyAnnual: 0.6,
				settings: '',
				category: 'kitchen general',
			},
			{
				appliances: 'Fridge',
				qty: 1,
				power: 150,
				timeSummer: 12,
				energySummer: 1.8,
				timeWinter: 10,
				energyWinter: 1.5,
				energyAnnual: 1.65,
				settings: '',
				category: 'kitchen general',
			},
			{
				appliances: 'Chest Freezer',
				qty: 1,
				power: 150,
				timeSummer: 12,
				energySummer: 1.8,
				timeWinter: 10,
				energyWinter: 1.5,
				energyAnnual: 1.65,
				settings: '',
				category: 'kitchen general',
			},
			{
				appliances: 'Oven 1',
				qty: 1,
				power: 3200,
				timeSummer: 0.5,
				energySummer: 1.6,
				timeWinter: 0.5,
				energyWinter: 1.6,
				energyAnnual: 1.6,
				settings: '',
				category: 'cooking',
			},
			{
				appliances: 'Frilnduction Cooktop Zone 4dge',
				qty: 1,
				power: 2200,
				timeSummer: 1,
				energySummer: 2.2,
				timeWinter: 1,
				energyWinter: 2.2,
				energyAnnual: 2.2,
				settings: '',
				category: 'cooking',
			},
			{
				appliances: 'Washing Machine',
				qty: 1,
				power: 700,
				timeSummer: 0.8,
				energySummer: 0.56,
				timeWinter: 0.8,
				energyWinter: 0.6,
				energyAnnual: 0.56,
				settings: '',
				category: 'cleaning / laundry',
			},
			{
				appliances: 'Clothes Dryer',
				qty: 1,
				power: 700,
				timeSummer: 0,
				energySummer: 0,
				timeWinter: 1,
				energyWinter: 0.7,
				energyAnnual: 0.35,
				settings: '',
				category: 'cleaning / laundry',
			},
			{
				appliances: 'Revers Cylce Air Con 5kW',
				qty: 1,
				power: 1200,
				timeSummer: 6,
				energySummer: 7.2,
				timeWinter: 2,
				energyWinter: 2.4,
				energyAnnual: 4.8,
				settings: '',
				category: 'heating / hot water',
			},
			{
				appliances: 'Hydronic Heating',
				qty: 1,
				power: 3200,
				timeSummer: 0,
				energySummer: 0,
				timeWinter: 4,
				energyWinter: 12.8,
				energyAnnual: 6.4,
				settings: '',
				category: 'heating / hot water',
			},
			{
				appliances: 'Hot Water Heat Pump',
				qty: 1,
				power: 550,
				timeSummer: 4,
				energySummer: 2.2,
				timeWinter: 6,
				energyWinter: 3.3,
				energyAnnual: 2.75,
				settings: '',
				category: 'heating / hot water',
			},
			{
				appliances: 'Lights LED',
				qty: 1,
				power: 10,
				timeSummer: 4,
				energySummer: 0.16,
				timeWinter: 5,
				energyWinter: 0.2,
				energyAnnual: 0.18,
				settings: '',
				category: 'other',
			},
		];
	}


  public getTitle(column: any): string {
		if (column.prop.includes('Summer')) {
			return 'summer';
		} else if (column.prop.includes('Winter')) {
			return 'winter';
		}

		return 'annual';
	}

	public increaseQuantity(row: RowModel): void {
		row.qty = row.qty + 1;
    this.rows = [...this.rows];
	}

	public decreaseQuantity(row: RowModel): void {
		if (row.qty === 0) {
			return;
		}
		row.qty = row.qty - 1;
    this.rows = [...this.rows];
	}

	public getValueForAnnualCell(row: RowModel): number {
		return row.energyAnnual =  parseFloat(((row.energySummer + row.energyWinter) / 2).toFixed(2));
	}

  public getValueCalculateSummer(row: RowModel): number {
    return row.energySummer = parseFloat(((row.qty * row.power * row.timeSummer)/1000).toFixed(2)) ;
  }

  public getValueCalculateWinter(row: RowModel): number {
    return row.energyWinter = parseFloat(((row.qty * row.power * row.timeWinter)/1000).toFixed(2));
  }

	public openModal(row: RowModel): void {
		this.isModalOpened = true;
		this.currentRow = row;
	}

	public removeRow(): void {
		this.rows = this.rows.filter((row: RowModel) => row.appliances !== this.currentRow.appliances);
		this.isModalOpened = false;
	}

	public addRow(): void {
		const newRow: RowModel = {
			appliances: '',
			qty: 1,
			power: 0,
			timeSummer: 0,
			energySummer: 0,
			timeWinter: 0,
			energyWinter: 0,
			energyAnnual: 0,
			settings: '',
			category: this.currentRow.category,
		};
		this.rows = [...this.rows, newRow];
		this.isModalOpened = false;
	}

	public changeRowField(row: any, event: Event, prop: string): void {
		if (prop === 'appliances') {
			row[prop] = (event.target as HTMLInputElement).value;
			return;
		}
		row[prop] = +(event.target as HTMLInputElement).value;
		this.rows = [...this.rows];
	}
}
