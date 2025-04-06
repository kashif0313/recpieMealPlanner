import { Component, OnInit } from '@angular/core';

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
    console.log('Saved lists from storage:', savedLists);

    if (savedLists.length > 0) {
      // Loop through each recipe and separate its items into toBuy and bought lists
      savedLists.forEach((recipe: any) => {
        // Filter the list of items into toBuyList and boughtList based on 'bought' status
        const toBuy = recipe.list.filter((item: any) => !item.bought);
        const bought = recipe.list.filter((item: any) => item.bought);

        // Optionally, you can store these lists in a more structured way
        this.toBuyList.push(...toBuy);
        this.boughtList.push(...bought);
      });

      console.log('To Buy List:', this.toBuyList);
      console.log('Bought List:', this.boughtList);
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
