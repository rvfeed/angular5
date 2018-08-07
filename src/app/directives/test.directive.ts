import { Directive, ElementRef,  TemplateRef, ViewContainerRef, Input, ViewChild, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {
 // @Input() appTestOf : Array<Number>;
  @Input() appTest : Array<Number>;

  constructor(private templateRef : TemplateRef<any>, private viewContainerRef : ViewContainerRef) { }
/*@Input() set appTest(param: any){
  /*param.forEach( (i) => {
  this.viewContainerRef.createEmbeddedView(this.templateRef);
  })

    console.log(param);
}*/
ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add 'implements OnChanges' to the class.
  console.log(this.appTest);
  console.log(changes);
 
}
ngDoCheck() {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
 // console.log(this)
}

@Input() set appTestOf(a){
a.forEach( (i) => {
  this.viewContainerRef.createEmbeddedView(this.templateRef, {$implicit : i});
  })
}
}

