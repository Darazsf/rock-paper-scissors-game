/*
Írj egy kő, papír, olló játékot!

A start gombra kattintva 3 másodpercünk van eldönteni, hogy kő, papír vagy
olló a választásunk.

Mindegyik választáshoz legyen egy-egy gomb. Ha nem kattintunk időben valamelyik
gombra, akkor automatikusan veszítettünk.

Az időzítő lejártakor jelenítsük meg a DOM-ban a számítógép választását és a játék
eredményét!*/

let startDOM = document.querySelector(".start")
let valasztasDOM = document.querySelectorAll(".valasztas")
let idoDOM = document.querySelector(".ido")
let szamlaloDOM = document.querySelector(".szamlalo")
let gepValasztasDOM = document.querySelector(".gep")
let kimenetelDOM = document.querySelector(".vegkimenetel")
let ujraDOM=document.querySelector(".ujra")
let statDom=document.querySelector(".statisztika")
let winDom=document.querySelector(".win-round")
let looseDom=document.querySelector(".loose-round")
let drawDom=document.querySelector(".draw-round")
let sajatDom=document.querySelector(".sajat")
let valaszDom=document.querySelector('.valasz')

let szam = 3
idoDOM.innerHTML = szam


let generalt = choose()
let interV;
let nyert = 0
let vesztes = 0
let draw =0

if(szam<2){
    idoDOM.classList.add("red")
}


function ido() {
    szam = szam - 1
    idoDOM.innerHTML = szam
    if (szam === -1) {
        alert("Lejárt az időd! Vesztettél!")
        clearInterval(interV)
        vesztes = vesztes + 1
        looseDom.innerHTML="Vesztett körök :" + vesztes
        valaszDom.style.display='none'
        ujraDOM.style.display = 'inline-block';
        
    }
}

function choose() {
    let select = ['Kő', 'Papír', 'Olló'];
    let index = Math.floor(Math.random() * select.length)
    console.log(select[index])
    return select[index]
}

ujraDOM.addEventListener('click', () =>{
    idoDOM.innerHTML = szam
    startDOM.style.display = 'inline-block';
    ujraDOM.style.display = 'none';
    gepValasztasDOM.innerHTML = ""
    kimenetelDOM.innerHTML = ""
    sajatDom.innerHTML=""
    szam=3
    idoDOM.innerHTML = szam
    kimenetelDOM.className=""    
   
    
})

startDOM.addEventListener('click', () => {
    idoDOM.innerHTML = szam
    interV = setInterval(ido, 1000)
    choose()
    startDOM.style.display = 'none';
    valaszDom.style.display='block'
    
 

})

valasztasDOM.forEach(button => {
    button.addEventListener('click', event => {
        gepValasztasDOM.innerHTML = `A gép válaztása : ${generalt}`
        clearInterval(interV);
        sajatDom.innerHTML= `A te választásod: ${event.target.innerHTML}`;
        eredmeny = event.target.innerHTML
        vegeredmeny(eredmeny)
        ujraDOM.style.display='inline-block'
        valaszDom.style.display='none'
        
        
    });
});

function vegeredmeny() {
    if (eredmeny === generalt) {
        kimenetelDOM.innerHTML = "Döntetlen"
    } else if (eredmeny === "Kő" && generalt === "Papír") {
        kimenetelDOM.innerHTML = "Vesztettél"
    } else if (eredmeny === "Kő" && generalt === "Olló") {
        kimenetelDOM.innerHTML = "Nyertél"
    } else if (eredmeny === "Papír" && generalt === "Kő") {
        kimenetelDOM.innerHTML = "Nyertél"
    } else if (eredmeny === "Papír" && generalt === "Olló") {
        kimenetelDOM.innerHTML = "Vesztettél"
    } else if (eredmeny === "Olló" && generalt === "Kő") {
        kimenetelDOM.innerHTML = "Vesztettél"
    } else if (eredmeny === "Olló" && generalt === "Papír") {
        kimenetelDOM.innerHTML = "Nyertél"
    }
    kiiras()
}



function kiiras(){
    if(kimenetelDOM.innerHTML === "Nyertél"){
        kimenetelDOM.classList.add('win') 
        nyert = nyert + 1
    }else if(kimenetelDOM.innerHTML === "Vesztettél"){
        kimenetelDOM.classList.add('loose')
        vesztes = vesztes + 1
    }else if(kimenetelDOM.innerHTML = "Döntetlen"){
        kimenetelDOM.classList.add('tied')
        draw = draw + 1
    } 
    pontszam()
}

function pontszam (){

    winDom.innerHTML="Nyert körök :" + nyert
    looseDom.innerHTML="Vesztett körök :" + vesztes
    drawDom.innerHTML="Döntettlen :" + draw

}