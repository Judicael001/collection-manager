import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs'; // AJOUT : Importer Subscription

@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLink],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.scss',
})
export class CollectionItemDetail {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  itemId = input<number | null, string | null>(null, {
    alias: 'id',
    transform: value => value ? parseInt(value) : null
  });
}
