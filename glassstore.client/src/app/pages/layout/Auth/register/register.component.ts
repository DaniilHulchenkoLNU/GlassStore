import { Component, Inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../../../services/Auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent {

  constructor(private as: AuthService, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  register(email: string, password: string) {
    this.as.register(email, password).subscribe(
      () => {
        this.removeModalBackdrop();
        this.as.login(email, password).subscribe();
      },
      error => {
        alert('Wrong login or password.')
      }
    );
  }

  private removeModalBackdrop() {
    const element = this.document.querySelector('.modal-backdrop.fade.show');
    if (element) {
      this.renderer.removeChild(this.document.body, element);
    }
  }
}
