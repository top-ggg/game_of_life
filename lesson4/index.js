var Company = require('./company')

var offers = {
    "offers": [
        {
            "id": 1,
            "position": "software developer"
        },
        {
            "id": 2,
            "position": "marketing expert"
        }
    ]
}

var newCompany = new Company("Microsoft", 80, offers)

console.log(newCompany.getOffers())