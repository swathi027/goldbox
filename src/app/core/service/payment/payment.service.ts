import {Injectable} from '@angular/core';
import {JavascriptService} from './javascript.service';
import {WindowRefService} from './window-ref.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentProcessed: boolean | undefined;
  isSubmitting: boolean | undefined;
  transferCompleted: boolean | undefined;

  constructor(
    private jsService: JavascriptService,
    private winRef: WindowRefService,
    private api: ApiService,
    private router: Router,

  ) {
    this.jsService.injectJsScript(`https://checkout.razorpay.com/v1/checkout.js`);
  }

  // Pay Scheme//
  paySchemeWithRazor(user_scheme_id:any,user_id:any,live_price:any,amount:any) {
   const options: any = {
     key: environment.razorPayApiKey,
     amount: amount*100, // amount should be in paise format to display Rs 1255 without decimal point
     currency: 'INR',
     name: 'Gold Box', // company name or product name
     description: `Gold Box Scheme EMI`,  // product description
     image: 'assets/img/logo.png', // company logo or product image

     modal: {
       // We should prevent closing of the form when esc key is pressed.
       escape: false,
     },
     notes: {
       // include notes if any
     },
     theme: {
       color: '#630914'
     }
   };
   options.handler = ((response: { razorpay_payment_id: null; }, error: any) => {
     options.response = response;
     if ('razorpay_payment_id' in response) {
       const paymentid= response.razorpay_payment_id;

       // posting data
       const data={
        user_id :user_id,
        live_price:live_price,
        payment_id:paymentid
       }
       this.api.post(`/schemes/mmi-payment/${user_scheme_id}`,data).subscribe((res:any)=>{
         alert(res.msg);
         window.location.reload()
       },(err)=>{
         alert(err.error.msg);
       })
     }
   });
   options.modal.ondismiss = (() => {
     window.location.href = `/dashboard`;
   });
   const rzp = new this.winRef.nativeWindow.Razorpay(options);
   rzp.open();
 }

  // Pay Scheme//
  buygold(amount:any,grams:any,gold_price_per_gram:any,user_id:any) {
    const options: any = {
      key: environment.razorPayApiKey,
      amount: amount*100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Gold Box', // company name or product name
      description: `Gold Box Scheme EMI`,  // product description
      image: 'assets/img/logo.png', // company logo or product image
 
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#630914'
      }
    };
    options.handler = ((response: { razorpay_payment_id: null; }, error: any) => {
      options.response = response;
      if ('razorpay_payment_id' in response) {
        const payment_id= response.razorpay_payment_id;
 
        // posting data
        const data={
          payment_id:payment_id,
          amount:amount,
          grams:grams,
          gold_price_per_gram:gold_price_per_gram,
          user_id:user_id
        }
        this.api.post(`/users/digital-wallet/goldpurchase`,data).subscribe((res:any)=>{
          alert(res.message);
          window.location.reload()
 
        },(err)=>{
          alert(err.error.msg);
        })
      }
 
    });
    options.modal.ondismiss = (() => {
      window.location.reload()
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
