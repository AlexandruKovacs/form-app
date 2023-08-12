import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      if(email === 'alex@google.com') {
        subscriber.next({
          emailExists: true
        });
        subscriber.complete();
        subscriber.unsubscribe();
        // return;
      }

      subscriber.next(null);
      subscriber.complete();
      subscriber.unsubscribe();

    }).pipe(
      delay(3500)
    );

    return httpCallObservable;

  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailExists: true
  //   }).pipe(
  //     delay(3500)
  //   )

  // }

}
