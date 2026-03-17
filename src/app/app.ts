import { Component, computed, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from './components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CollectionItemCard, SearchBar]
})
export class App {

  count = 0;
  searchText = '';

  coin!: CollectionItem;
  linx !: CollectionItem;

  itemList: CollectionItem[] = [];
  selectedItemIndex = signal(0);
  selectedItem = computed(() => { 
    return this.itemList[this.selectedItemIndex()] 

  });

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = 'Pièce de 1972';
    this.coin.description = 'Pièce de 50 centimes de francs.';
    this.coin.rarity = 'Commune';
    this.coin.image = 'img/coin1.png';
    this.coin.price = 170;

    this.linx = new CollectionItem();

    this.itemList = [
      this.coin,
      this.linx
    ]
  }

  increamentCount() {
    this.count++;
  }

  incrementIndex() {
    this.selectedItemIndex.update((currentValue) => {
      return (currentValue + 1) % 2
    })
  }

}
