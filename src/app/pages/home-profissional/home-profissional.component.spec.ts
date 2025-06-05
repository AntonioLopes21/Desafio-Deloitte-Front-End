import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfissionalComponent } from './home-profissional.component';

describe('HomeProfissionalComponent', () => {
  let component: HomeProfissionalComponent;
  let fixture: ComponentFixture<HomeProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
