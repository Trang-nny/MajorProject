import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizDetail } from './quiz-detail'; // Import đúng tên class QuizDetail


describe('QuizDetail', () => {
  let component: QuizDetail;
  let fixture: ComponentFixture<QuizDetail>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Vì QuizDetail là Standalone Component, chúng ta đưa vào imports
      imports: [QuizDetail],
    }).compileComponents();


    fixture = TestBed.createComponent(QuizDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render quiz title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Kiểm tra xem tiêu đề quiz có hiển thị đúng không
    expect(compiled.querySelector('.quiz-title')?.textContent).toContain('Mastering Cyber Security 2024');
  });
});
