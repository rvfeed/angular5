import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CommService } from '../../comm.service';
interface ICompany{
    name: string;
    floor: number[];
    cafetaria: boolean;
    employees: number;
}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
 name: string;
 myCompany: FormGroup;
 floors: number[] = [1, 2, 3, 4, 5, 6,7,8];
 @Input() comp: string = "test";
 @Output() say: EventEmitter<string> = new EventEmitter<string>();
  constructor(private comm: CommService) {
    this.comm.companyObs$.subscribe((company) => {
    this.comp = company;
      console.log(company)
    }
      )
   }

  ngOnInit() {
    this.myCompany =  new FormGroup({
      companyName: new FormControl(this.comp, Validators.required),
      floor: new FormControl("1", Validators.required),
      employees: new FormControl("", Validators.required),
      cafetaria: new FormControl("", Validators.required),
    })
    this.name = "Valuelabs technologies LLP."
    console.log(this.comp);
  }

onSubmit(){
  console.log(this.myCompany.valid)
}


}
