public with sharing class RetrieveAccounts {
    public List<Account> AccountList{get;set;}
    public RetrieveAccounts() {
        AccountList = [select id,Name,Driver_Charges__c,BillingAddress,quantity__c,product_price__c,ShippingAddress,Product_Name__c from Account
            where Product_Name__c!=null  limit 1];
    }
}
