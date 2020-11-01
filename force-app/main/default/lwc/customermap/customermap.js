import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import CUSTOMER_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/customerListUpdate__c';
export default class customerrMap extends LightningElement {
  mapMarkers = [];
  subscription = null;
  @wire(MessageContext)
  messageContext;
  connectedCallback() {
    // Subscribe to BearListUpdate__c message
    this.subscription = subscribe(
        this.messageContext,
        CUSTOMER_LIST_UPDATE_MESSAGE,
        (message) => {
            this.handlecustomerListUpdate(message);
        });
  }
  disconnectedCallback() {
    // Unsubscribe from BearListUpdate__c message
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  handlecustomerListUpdate(message) {
    this.mapMarkers = message.customers.map(customer => {
      const Latitude = customer.Location__Latitude__s;
      const Longitude = customer.Location__Longitude__s;
      return {
        location: { Latitude, Longitude },
        title: customer.Name,
        description: `Coords: ${Latitude}, ${Longitude}`,
        icon: 'custom:custom51'
      };
    });
  }
}
