import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { AppGetcurrenciesService } from '../app.getcurrencies.service';
import { AppComponent } from './app.component';
import { NestedComponent } from '../nested/nested.component';
import { InnerComponent } from '../inner/inner.component';
import { UserComponent } from '../user/user.component';
import { HeaderComponent } from '../app.header';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { PheonixComponent } from '../pheonix/pheonix.component';
import { AppWeatherComponent } from '../weather/app.weather';
import { SearchPipe } from '../search.pipe';
import { RouterTestingModule} from '@angular/router/testing';
import { CommService } from '../comm.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NestedComponent,
        InnerComponent,
        UserComponent,
        HeaderComponent,
        DropdownComponent,
        PheonixComponent,
        AppWeatherComponent,
        SearchPipe
      ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      providers: [AppGetcurrenciesService, CommService]      
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Forex Exchange');
  }));
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Convert');
  }));
});
