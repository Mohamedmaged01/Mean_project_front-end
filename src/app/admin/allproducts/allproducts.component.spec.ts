import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllProductsComponent } from './allproducts.component';
describe('GetallproductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
