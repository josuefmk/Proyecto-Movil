import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole') roles: string[];

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef) { }
  
  ngOnInit() {
    this.authService.getUserSubject().subscribe(_ => {
      if (this.authService.hasRole(this.roles)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  
  }
}
