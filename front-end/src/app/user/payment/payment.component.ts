import { Component, OnInit } from "@angular/core";
import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js";
import { HttpClient } from "@angular/common/http";
import { NgIf } from "@angular/common";
import { PaymentService } from "../../services/payment.service";


declare var bootstrap: any;
@Component({
  selector: 'app-payment',
  imports: [NgIf],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  stripe!: Stripe;
  elements!: StripeElements;
  cardElement!: StripeCardElement;
  loading = false;
  message = "";

  constructor(private http: HttpClient , private paymentService: PaymentService) { }

  async ngOnInit() {
    const stripeInstance = await loadStripe("pk_test_51Oa1apC2Y3Ne3oUhz8quAdzU0O1aAgoTSP0wwiEMbUqZDd0knNgOnMSyU3Us4s05QjCdwvqmxA2EDGAT3Mj9a3kj00BKiR5q83");
    if (!stripeInstance) {
      throw new Error("Failed to load Stripe");
    }
    this.stripe = stripeInstance;
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create("card");
    this.cardElement.mount("#card-element");
  }

  async pay(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.message = "";
    const paymentMessage = document.getElementById("paymentMessage") as HTMLElement;
    paymentMessage.textContent = "Processing payment...";
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: "card",
      card: this.cardElement,
    });

    if (error) {
      paymentMessage.textContent = "Error: " + error.message;
  } else {
      console.log("Transaction ID:", paymentMethod.id);
      paymentMessage.textContent = `✅ Payment Successful! Transaction ID: ${paymentMethod.id}`;
  }

    
  }
}
