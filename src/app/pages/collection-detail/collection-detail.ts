import { ChangeDetectionStrategy, Component, computed, inject, model, signal } from '@angular/core';
import { CollectionService } from '../../services/collection-service';
import { Collection } from '../../models/collection';
import { CollectionItem } from '../../models/collection-item';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-collection-detail',
  imports: [CollectionItemCard, SearchBar, MatButtonModule],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CollectionDetail {

  private readonly router = inject(Router);
  
  collectionService = inject(CollectionService);
  search = model('');

  selectedCollection = signal<Collection | null>(null);
  displayedItems = computed(() => {
    const allItems = this.selectedCollection()?.items || [];
    return allItems.filter(item => 
      item.name.toLowerCase().includes(
        (this.search() || '').toLocaleLowerCase()
      )
    )
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }

  }

addItem() {
  const collection = this.selectedCollection();
  if (collection) {
    const storedCollection = this.collectionService.addItem(
      collection, new CollectionItem()
    );
    this.selectedCollection.set(storedCollection);
  }
}

}
