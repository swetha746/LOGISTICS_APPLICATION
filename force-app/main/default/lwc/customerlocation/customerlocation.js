import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Set Bear object fields
const NAME_FIELD = 'customer__c.First_Name__c';
const LOCATION_LATITUDE_FIELD = 'customer__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'customer__c.Location__Longitude__s';
const customerFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];
export default class customerlocation extends LightningElement {
  @api recordId;
  First_Name__c;
  mapMarkers = [];
  @wire(getRecord, { recordId: '$recordId', fields: customerFields })
  loadBear({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Bear data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform bear data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'customer location';
  }
}
