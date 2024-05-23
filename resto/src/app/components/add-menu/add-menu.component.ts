import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  f: any;
  imagePreview: string = '';
  menuForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    categoryId: new FormControl(''),
  });

  categories: any[] = [];
  menuData: any = {};
  selectedImage: File | null = null;

  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.menuForm = this.formBuilder.group({
      name: [''],
      price: [''],
      categoryId: [''],
      description: [''],
      img: [''],
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: any[]) => {
        this.categories = response;
        console.log('categories :', this.categories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.f = file;
    this.menuForm.patchValue({ img: file });
    this.menuForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log('image', file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('salem');
    if (this.f) {
      const formData = new FormData();

      formData.append('name', this.menuData.name);
      formData.append('description', this.menuData.description);
      formData.append('price', this.menuData.price);
      formData.append('categoryId', this.menuData.categoryId);
      formData.append('image', this.f as Blob);
      console.log('menu :', this.f);
      this.menuService.createMenu(formData).subscribe(
        (response) => {
          console.log('Menu ajouté avec succès !', response);
          // Réinitialiser le formulaire après l'ajout du menu
          //form.resetForm();
          // Réinitialiser l'image sélectionnée
          this.selectedImage = null;
          // Réinitialiser les données du menu
          this.menuData = {};
        },
        (error) => {
          console.error("Erreur lors de l'ajout du menu :", error);
        }
      );
    } else {
      console.error('Formulaire invalide ou image non sélectionnée.');
    }
  }
}
