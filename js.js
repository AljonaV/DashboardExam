let myObject;
let beersServed = 0;
let lastIdCounted =0;
document.addEventListener("DOMContentLoaded",getData);
setInterval(()=>{
    console.log(myObject);
    getData();
    document.querySelector(".information").innerHTML = "";
    document.querySelector(".bartenders").innerHTML = "";
    document.querySelector(".menuList").innerHTML = "";
    showBarInfo();
    showBartenders();
    showMenu();
},3000);
async function getData() {
    let data = FooBar.getData();
    myObject=JSON.parse(data);

    myObject.serving.forEach(customer=>{
        if(customer.id>lastIdCounted){
            beersServed += customer.order.length;
            lastIdCounted = customer.id;
        }
    })

        showBarInfo();
    showBartenders();
    showMenu();
}

function showBarInfo(data){
    let list = document.querySelector(".information");
    let template = document.querySelector("#barInfoTemplate").content;
    let clone = template.cloneNode(true);
    let barInfo = clone.querySelector("#barInfo");
    list.appendChild(clone);
    barInfo.innerHTML = myObject.bar.name + " closing at " + myObject.bar.closingTime;

}


function showBartenders(){
    let bartenderInfo = myObject.bartenders;
    bartenderInfo.forEach(infoBartender =>{
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;
        let clone = bartendersTemplate.cloneNode(true);
        clone.querySelector("#name").textContent = infoBartender.name;
        clone.querySelector("#status").textContent = infoBartender.status;
        clone.querySelector("#statusDetail").textContent = infoBartender.statusDetail;
        clone.querySelector("#usingTap").textContent = infoBartender.usingTap;
        clone.querySelector("#servingCustomer").textContent = infoBartender.servingCustomer;
        document.querySelector(".bartenders").appendChild(clone);
    })

}

function showMenu(){
    let menuList = myObject.beertypes;
    menuList.forEach(listMenu =>{
        let menuTemplate = document.querySelector(".menuTemplate").content;
        let clone = menuTemplate.cloneNode(true);
        clone.querySelector("#name").textContent = listMenu.name;
        clone.querySelector("#alc").textContent = "Alcohol: " + listMenu.alc + "%";
        clone.querySelector("#beerImage").innerHTML = '<img src="img/' + listMenu.label + '" alt="">';
        clone.querySelector("#descriptionAppearance").innerHTML = "<h4>Appearance</h4>" + listMenu.description.appearance;
        clone.querySelector("#descriptionAroma").innerHTML = "<h4>Aroma</h4>" + listMenu.description.aroma;
        clone.querySelector("#descriptionFlavor").innerHTML = "<h4>Flavor</h4>" + listMenu.description.flavor;
        clone.querySelector("#descriptionMouthfeel").innerHTML = "<h4>Mouth feel</h4>" + listMenu.description.mouthfeel;
        clone.querySelector("#descriptionOverallImpression").innerHTML = "<h4>Overall Impression</h4>" + listMenu.description.overallImpression;
        document.querySelector(".menuList").appendChild(clone);
    })

}