import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarServicosComponent } from './explorar-servicos.component';

describe('ExplorarServicosComponent', () => {
  let component: ExplorarServicosComponent;
  let fixture: ComponentFixture<ExplorarServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
