import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3020/categories'; // Assurez-vous de mettre la bonne URL de votre serveur

  constructor(private http: HttpClient) {}

  // Créer une catégorie
  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, categoryData);
  }

  // Obtenir toutes les catégories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Obtenir une catégorie par son ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${categoryId}`);
  }

  // Mettre à jour une catégorie
  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${categoryId}`, categoryData);
  }

  // Supprimer une catégorie
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${categoryId}`);
  }
}
