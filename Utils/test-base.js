const base = require('@playwright/test');

exports.customtest=base.test.extend(
    {
        testDataForOrder : {
            productName : "zara coat 3",
            username : "med.aziz.helali1992@gmail.com",
            password : "MarouZizou82"
        }
    }
)