import { Component, Input } from '@angular/core';

@Component({
  selector: 'mw-category-list',
  template: `
    <span class="label" *ngFor="let category of categories">{{
      category
    }}</span>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 10px;
      }
      :host-context(.medium-movies) span {
        background-color: #7d82b8;
      }
      :host-context(.medium-series) span {
        background-color: #ef798a;
      }
      span {
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 4px;
      }
    `,
  ],
})
export class CategoryListComponent {
  @Input() categories: string[];
}
