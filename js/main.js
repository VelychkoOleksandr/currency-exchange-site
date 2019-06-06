//BUGS
// -- EUR request doesn't back EUR/EUR rate

const serverURL = 'https://api.exchangeratesapi.io/latest?';
//const accessKey = 'a88912d8d8dfdd9fc08c';
let baseCurrency = 'USD';
let quoteCurrency = 'USD';
let rates = {};
let amount = 0;
let exchngeResult = 0;

//Initialize Converter
function initializeCoverter() {
    exchangeRatesRequest().then(msg => {
        setExchngeResualt();
    })
};

function getAmount() {
    if ($('#input').val() === '') {
        console.log('Insert Value');
        return false;
    }
    amount = $('#input').val();
    return amount;
}

function addListeneres() {
    $('#base-currency').change((event) => {  
        baseCurrency = $('#base-currency option:selected').val();
        exchangeRatesRequest().then(msg => {
            setExchngeResualt();
        })
        console.log(baseCurrency);
    });

    $('#quote-currency').change((event) => { 
        quoteCurrency = $('#quote-currency option:selected').val();
        exchangeRatesRequest().then(msg => {
            setExchngeResualt();
        })
        console.log(quoteCurrency);
    });

    $('#input').on('input', () => {
        baseCurrency = $('#base-currency option:selected').val();
        getAmount();
        setExchngeResualt();
        console.log(`
                Base Currency: ${baseCurrency};
                Quote Cyrrency: ${quoteCurrency};
                Amount: ${amount};
                Exchange Result: ${exchngeResult};
            `);
    });
}

function setExchngeResualt() {
    if (baseCurrency === 'EUR' && quoteCurrency === 'EUR') {
        let exchngeResult = 1 * amount;
        $('#output').val(exchngeResult);
        return;
    }
    let exchngeResult = rates.rates[quoteCurrency] * amount;
    $('#output').val(exchngeResult);
}

async function exchangeRatesRequest() {
    console.log('Base Currency!' + baseCurrency);
    let requestURL  = `${serverURL}base=${baseCurrency}`;
    console.log(requestURL);
    let response = await fetch(requestURL);
    rates = await response.json();

    return new Promise((resolve, reject) => {
        if (rates != {}) {
            resolve('Rates Successfully Downloaded.');
        } else {
            reject('Rates Are Unavailable');
        }
    })

}

$(document).ready(function () {
    //START CONVERTER
    initializeCoverter();
    addListeneres();
});








