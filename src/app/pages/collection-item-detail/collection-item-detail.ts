import { Component, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionItem, Rarities } from '../../models/collection-item';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { Subscription } from 'rxjs';
import { CollectionService } from '../../services/collection-service';
import { Collection } from '../../models/collection';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection-item-detail',
  imports: [ReactiveFormsModule, CollectionItemCard, MatButtonModule,
  MatFormField, MatInputModule, MatSelectModule
  ],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.scss',
})
export class CollectionItemDetail implements OnDestroy {
  
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly collectionService = inject(CollectionService);

  rarities = Object.values(Rarities);

  itemId = input<number | null, string | null>(null, {
    alias: 'id',
    transform: ((id: string | null) => id ? parseInt(id) : null)
  });

  selectedCollection!: Collection;
  collectionItem = signal<CollectionItem>(new CollectionItem());

  valueChangeSubscription: Subscription | null = null;

  itemFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    rarity: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() {
    effect(() => {
      let itemToDisplay = new CollectionItem();
      this.selectedCollection = this.collectionService. getAll()[0];
      if (this.itemId()) {
        const itemFound = this.selectedCollection.items.find(item => item.id === this.itemId())
        if (itemFound) {
          itemToDisplay = itemFound;
        } else {
          this.router.navigate(['not-found']);
        }
      }
      this.itemFormGroup.patchValue(itemToDisplay);
    });
    this.valueChangeSubscription = this.itemFormGroup.valueChanges.subscribe(
    (_) => {
      this.collectionItem.set(
        Object.assign(new CollectionItem(), this.itemFormGroup.value)
      )
    }
  )
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.itemFormGroup.value);
  }

  isFieldValid(fieldName: string) {
    const formControl = this.itemFormGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.itemFormGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  deleteItem() {
    console.log('Delete item');
    //ici, je dois ajouter la logique de suppression
  }

  cancel() {
    this.router.navigate(['/collections']); // Redirige vers la liste des collections
  }

  ngOnDestroy(): void {
      this.valueChangeSubscription?.unsubscribe();
  }
}
