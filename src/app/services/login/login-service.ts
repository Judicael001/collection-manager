import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { tap } from 'rxjs';

export interface LoginCredentialsDTO {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private LK_TOKEN = 'TOKEN';
  private BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  user = signal<User | null | undefined>(undefined);


  login(credentials: LoginCredentialsDTO) {
    return this.http.post(this.BASE_URL + '/login', credentials).pipe(
      tap((result: any) => {
        localStorage.setItem(this.LK_TOKEN, result['token']);
      })
    );
  }
}
