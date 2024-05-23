import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseUrl = 'http://localhost:3020/menus'; // Assurez-vous de mettre la bonne URL de votre serveur

  constructor(private http: HttpClient) {}

  // Créer un menu
  createMenu(menuData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-menu`, menuData);
  }

  // Obtenir tous les menus
  getAllMenus(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Obtenir un menu par son ID
  getMenuById(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${menuId}`);
  }

  // Mettre à jour un menu
  updateMenu(menuId: number, menuData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${menuId}`, menuData);
  }

  // Supprimer un menu
  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${menuId}`);
  }
}
