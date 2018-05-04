export class UserComponent {
  name: string;
  age: number;
  education: string;
  constructor(name: string, age: number, education: string) {
      this.name = name;
      this.age = age;
      this.education = education;
   }
}