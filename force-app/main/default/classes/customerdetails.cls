public with sharing class customerdetails {
    @AuraEnabled(Cacheable=true)
    public static Customer__c[] getAlldetails() {
        return [
            SELECT
                Id,
                First_Name__c,
                Second_Name__c,
                Email__c,
                MobileNumber__c,
                Address__c,
                LandMark__c,
                Location__Latitude__s,
                Location__Longitude__s,
                City__C,
                state__c,
                pincode__c

        
            FROM Customer__c
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static customer__c[] searchcustomers(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAlldetails();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT
                 Id,
                First_Name__c,
                Second_Name__c,
                Email__c,
                MobileNumber__c,
                Address__c,
                LandMark__c,
                Location__Latitude__s,
                Location__Longitude__s,
                City__C,
                state__c,
                pincode__c
                
        
            FROM Customer__c
           
            WHERE Name LIKE :searchTerm
            ORDER BY Name
            LIMIT 50
        ];
    }
}
