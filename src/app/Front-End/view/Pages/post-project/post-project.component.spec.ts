import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProjectComponent } from './post-project.component';

describe('PostProjectComponent', () => {
  let component: PostProjectComponent;
  let fixture: ComponentFixture<PostProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostProjectComponent]
    });
    fixture = TestBed.createComponent(PostProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
