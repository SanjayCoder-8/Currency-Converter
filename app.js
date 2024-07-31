const Base_url=" https://v6.exchangerate-api.com/v6/06fad58e119e2cf5a4c5cacd/latest";
let dropdownSelect=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromVal=document.querySelector(".from select");
let toVal=document.querySelector(".to select");

for(let select of dropdownSelect)
{
    for(code in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        select.append(newOption);
        if(select.name==="from"&&code==="USD")
        {
            newOption.selected="selected";
        }
        if(select.name==="to"&&code==="INR")
        {
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let coutryCode=countryList[currCode];
    let imgSrc=element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${coutryCode}/flat/64.png`;
    imgSrc.src=newSrc;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal===""||amtVal<1)
    {
        amtVal = 1;
        amt.value = "1";
    }
    const url=`${Base_url}/${fromVal.value}`;
    let response=await fetch(url);
    let data=await response.json();
    let exchangerate=data.conversion_rates[toVal.value];
    let finalAmount=amtVal*exchangerate;
    document.querySelector(".msg").innerText=`${amtVal} ${fromVal.value}=${finalAmount} ${toVal.value}`;
});