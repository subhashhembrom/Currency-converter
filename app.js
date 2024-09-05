const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selection = document.querySelectorAll(".selection select ");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

const from = document.querySelector("#from select");
const to = document.querySelector("#to select");

// for (codes in countryList){
//     console.log(codes);
// }

for (let select of selection){
    for ( currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode ;
        newOption.value = currCode ;
        if (select.name === "From" && currCode === "INR"){
            newOption.selected = "selected" ;
        }
        if(select.name === "To" && currCode === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption); 
    }

    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc ;
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if (amtValue === "" || amtValue < 1){
        amtValue = 0;
        amount.value = "0";
    }

    // console.log(from.value.toLowerCase, to);
    const newUrl = `${baseUrl}/${from.value.toLowerCase()}.json`;
    let response = await fetch(newUrl);
    // console.log(response);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = (amtValue*rate).toFixed(3);

    msg.innerText = (`${amtValue} ${from.value} = ${finalAmount} ${to.value}`);

})

