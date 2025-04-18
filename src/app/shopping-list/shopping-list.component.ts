import { Component, OnInit } from '@angular/core';
import { predefinedIngredients } from '../helper/shoppingList';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  toBuyList: { name: string; qty: string; emoji: string; unit: string }[] = [];
  boughtList: { name: string; qty: string; emoji: string; unit: string }[] = [];

  newItemName = '';
  newItemQty = '';
  newItemUnit = '';
  defaultEmoji = '🛒'; // fallback emoji

  async ngOnInit() {
    // Initialize filtered ingredients with all keys in nutrientDatabase
    await this.loadShoppingList();
  }
  loadShoppingList() {
    const savedLists = JSON.parse(
      localStorage.getItem('shoppingLists') || '[]'
    );

    if (!savedLists || savedLists.length === 0) {
      // If no items in localStorage, use predefined and store them
      localStorage.setItem(
        'shoppingLists',
        JSON.stringify(predefinedIngredients)
      );

      const toBuy = predefinedIngredients.filter((item: any) => !item.bought);
      const bought = predefinedIngredients.filter((item: any) => item.bought);

      this.toBuyList.push(...toBuy);
      this.boughtList.push(...bought);
    } else {
      // savedLists is already an array of shopping items
      const toBuy = savedLists.filter((item: any) => item.bought !== true);
      const bought = savedLists.filter((item: any) => item.bought === true);

      this.toBuyList.push(...toBuy);
      this.boughtList.push(...bought);
    }
  }

  addItem() {
    if (this.newItemName.trim() && this.newItemQty.trim()) {
      this.toBuyList.push({
        name: this.newItemName,
        qty: this.newItemQty,
        emoji: this.defaultEmoji,
        unit: this.newItemUnit,
      });
      this.newItemName = '';
      this.newItemQty = '';
      this.saveShoppingList(); // Save after adding new item
    }
  }

  toggleItem(item: any, listType: 'toBuy' | 'bought') {
    if (listType === 'toBuy') {
      // Remove from toBuy and add to bought
      this.toBuyList = this.toBuyList.filter((i) => i !== item);
      this.boughtList.push({ ...item, bought: true });
    } else {
      // Remove from bought and add back to toBuy
      this.boughtList = this.boughtList.filter((i) => i !== item);
      this.toBuyList.push({ ...item, bought: false });
    }
    this.saveShoppingList(); // Save after toggling item
  }

  removeItem(item: any, listType: 'toBuy' | 'bought') {
    if (listType === 'toBuy') {
      this.toBuyList = this.toBuyList.filter((i) => i !== item);
    } else {
      this.boughtList = this.boughtList.filter((i) => i !== item);
    }
    this.saveShoppingList(); // Save after removing item
  }

  saveShoppingList() {
    // Save both toBuy and bought lists to localStorage
    const shoppingLists = JSON.parse(
      localStorage.getItem('shoppingLists') || '[]'
    );
    const currentListIndex = shoppingLists.findIndex(
      (list: any) => list.recipeName === 'currentRecipeName'
    );

    if (currentListIndex >= 0) {
      // Update the existing list
      shoppingLists[currentListIndex] = {
        recipeName: 'currentRecipeName',
        list: [...this.toBuyList, ...this.boughtList],
      };
    } else {
      // Create a new list
      shoppingLists.push({
        recipeName: 'currentRecipeName',
        list: [...this.toBuyList, ...this.boughtList],
      });
    }

    // Save updated lists back to localStorage
    localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
  }
}
