import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  toBuyList = [
    { name: 'Lettuce', qty: '2 heads', emoji: '🥬' },
    { name: 'Tomatoes', qty: '500g', emoji: '🍅' },
    { name: 'Cheese', qty: '200g', emoji: '🧀' },
  ];

  boughtList = [
    { name: 'Carrots', qty: '1kg', emoji: '🥕' },
    { name: 'Potatoes', qty: '2kg', emoji: '🥔' },
  ];

  newItemName = '';
  newItemQty = '';
  defaultEmoji = '🛒'; // fallback emoji

  addItem() {
    if (this.newItemName.trim() && this.newItemQty.trim()) {
      this.toBuyList.push({
        name: this.newItemName,
        qty: this.newItemQty,
        emoji: this.defaultEmoji,
      });
      this.newItemName = '';
      this.newItemQty = '';
    }
  }
  toggleItem(item: any, listType: 'toBuy' | 'bought') {
    if (listType === 'toBuy') {
      // Remove from toBuy and add to bought
      this.toBuyList = this.toBuyList.filter((i) => i !== item);
      this.boughtList.push(item);
    } else {
      // Remove from bought and add back to toBuy
      this.boughtList = this.boughtList.filter((i) => i !== item);
      this.toBuyList.push(item);
    }
  }

  removeItem(item: any, listType: 'toBuy' | 'bought') {
    if (listType === 'toBuy') {
      this.toBuyList = this.toBuyList.filter((i) => i !== item);
    } else {
      this.boughtList = this.boughtList.filter((i) => i !== item);
    }
  }
}
