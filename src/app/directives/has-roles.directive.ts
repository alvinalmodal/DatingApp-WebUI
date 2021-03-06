import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRoles]',
})
export class HasRolesDirective implements OnInit {
  @Input() appHasRoles: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userRoles = this.authService.decodedToken.role as Array<string>;
    // if no roles clear the viewContainerRef
    if (!userRoles) {
      this.viewContainerRef.clear();
    }

    // if user has role then render the element
    if (this.authService.roleMatch(this.appHasRoles)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
