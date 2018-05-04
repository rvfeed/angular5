import { Injectable } from '@angular/core';
import { UserComponent } from './app.classtypes';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommService {
  private userObs = new Subject<Array<string>>();
  private companyObs = new Subject<string>();
  userDetails$ = this.userObs.asObservable()
  companyObs$ = this.companyObs.asObservable()   
  public use: string[] = [];
  public company: string = "";
  logIt(userDetails: string){  
 //   console.log(userDetails)
 this.use.push(userDetails)
   this.userObs.next(this.use);
  // console.log(this.userObs)
  }
  getUsers(){
    return "this.user";
  }

  broadcastCompany(val: string){
    console.log(val)
      this.company = val;
      this.companyObs.next(this.company);
  }

}
