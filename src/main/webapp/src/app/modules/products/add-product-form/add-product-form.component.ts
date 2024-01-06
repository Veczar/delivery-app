import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoryDto, PartnerDto, ProductDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent {

  @Input()
  partner!: PartnerDto;

  product!: ProductDto;
  categories: CategoryDto[] = [];
  imageUrl: string | ArrayBuffer | null | undefined;

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    onSale: new FormControl(''),
    categories: new FormControl(''),
    photoPath: new FormControl(''),
    owner: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private http: HttpClient
  ) {
    this.initCategories();
  }

  initCategories() {
    this.http.get<CategoryDto[]>(`http://localhost:8080/api/categories`).subscribe((categories) => {
      this.categories = categories;
    })
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // Validates for a positive number with up to 2 decimal places
        ]
      ],
      categories: [
        '',
        [
          Validators.required,
        ]
      ],
      onSale: [false], // Assuming it's a boolean value
      photoPath: [
        '',
        [
          Validators.required,
          Validators.pattern(/\.(png|jpg|jpeg)$/i), // Validates for a valid image URL
        ]
      ],
      owner: [],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Manually trigger change detection - this solves the validation styling problem
    // Object.keys(this.productForm.controls).forEach(key => {
    //   const control = this.productForm.get(key);
    //   if (control) {
    //     control.setValue(control.value);
    //   }
    // });

    if (this.productForm.invalid) {
      console.log('wrong form')
      return;
    }

    const ownerId = this.partner.id;
    this.productForm.patchValue({owner: {id: ownerId}});

    const categoryId: number = this.productForm.value.categories;
    const productFormRef: ProductDto = this.productForm.value;
    productFormRef.categories = [{id: categoryId}];

    // console.log(this.productForm.value);

    this.productService.addProduct(this.productForm.value as ProductDto).subscribe((response: ProductDto) => {
      console.log('response:', response);
    });
  }

}
