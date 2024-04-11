// ----------------------------------------------------------
//            initialisation des variables
// ----------------------------------------------------------

let titreBouton='',
  entreeEnCours=false,
	position=1, // position entree d'un nombre
  dern='', // dernier caractere entré
  avDern='' // avant dernier caractere entré
  numerique='1234567890', // les caracteres numeriques
  bigNumber=1E10, // gestion imprecision calcul Math.tan
  maxNumber=9.99999999E99 // chiffre max affiché
  //espace=String.fromCharCode(160), //&nsp
  fleche=String.fromCharCode(8594),
  //retLigne=String.fromCharCode(10),
  pile0=0, // valeurs numerique pile et mem
  pile1=0, // valeurs numerique pile et mem
  pile2=0, // valeurs numerique pile et mem
  mem=0, // valeurs numerique pile et mem
  Vfixsci='FIX', // mode d'affichage
  decimales=2 ,
  Vdegrad='DEG',
  warning='',
  posentree='vide', // entree d'un nouveau nombre
  entree='',// affichage de l'entree
  listWarning=['\u2794SCI','error','error','!','error'], // liste des message d'erreur
  zaff=""; // affichage des valeurs pile et mem
let clicBjaune=false;// indicateur appui sur touche jaune
  
  
// ----------------------------------------------------------
// pour lecture et modification des affichages et des boutons
// ----------------------------------------------------------

ebdeg = document.getElementById("bdeg");
ebdeg.addEventListener("click", boutonGris);

docAjaune=document.getElementById("ajaune")
docAstk=document.getElementById("astk")
docAinfo = document.getElementById('ainfo'); 
docAmem = document.getElementById('amem'); 
docAz = document.getElementById('az'); 
docAy = document.getElementById('ay'); 
docAx = document.getElementById('ax'); 
docAdegrad = document.getElementById('adegrad'); 
docAfixsci = document.getElementById('afixsci'); 
docAdplusmoins = document.getElementById('adplusmoins'); 

// ----------------------------------------------------------
//              fonctions d'affichage et gestion
// ----------------------------------------------------------

function affichageInfo() {
  // mise a jour affichage infos modes 
  docAdegrad.textContent=Vdegrad;
  docAfixsci.textContent=Vfixsci;
  docAdplusmoins.textContent=decimales;
  docAinfo.textContent=warning;
  if (warning!==''){warning=''} // raz warning apres affichage
  // affichage du mode touche jaune
  if (clicBjaune===true) {docAjaune.textContent="\u25EF";} 
  else {docAjaune.textContent="";} 
}

function affichagePile(){ 
  // passage en SCI necessaire ?
  l0=pile0.toFixed(decimales).length;// eval longueur max affichage
  l1=pile1.toFixed(decimales).length;// si sup 16 caracteres
  l2=pile2.toFixed(decimales).length;// passage
  lmem=mem.toFixed(decimales).length;// en SCI
  lmax=Math.max(l0,l1,l2,lmem);
  if ((Vfixsci==='FIX')&&(lmax>16)) {Vfixsci='SCI';warning=listWarning[0]}
  
  // mise a jour affichage pile et mem
  if (Vfixsci==='FIX'){
    docAmem.textContent=mem.toFixed(decimales);
    docAz.textContent=pile2.toFixed(decimales);
    docAy.textContent=pile1.toFixed(decimales);
    docAx.textContent=pile0.toFixed(decimales);
  }
  else{
    docAmem.textContent=mem.toExponential(decimales);
    docAz.textContent=pile2.toExponential(decimales);
    docAy.textContent=pile1.toExponential(decimales);
    docAx.textContent=pile0.toExponential(decimales);
  } 
  // mise a jour affichage infos modes 
  affichageInfo();
}

function affichageInput(z){
  // affichage de x en mode entree
  if (z===''){affichagePile()} // si entree '' sortie mode entree
  //if (z===''){fDown();affichagePile()} // si entree '' sortie mode entree
  else {
  l0=pile0.toFixed(decimales).length;// eval longueur max affichage
  l1=pile1.toFixed(decimales).length;// si sup 16 caracteres
  l2=pile2.toFixed(decimales).length;// passage
  lmem=mem.toFixed(decimales).length;// en SCI
  lmax=Math.max(l0,l1,l2,lmem);
  if ((Vfixsci==='FIX')&&(lmax>16)) {Vfixsci='SCI';warning=listWarning[0]}
  
  if (Vfixsci==='FIX'){
    zaff=z+'_';
    docAmem.textContent=mem.toFixed(decimales);
    docAz.textContent=pile2.toFixed(decimales);
    docAy.textContent=pile1.toFixed(decimales);
    docAx.textContent=zaff;
  }
  else{
    zaff=z+'_';
    docAmem.textContent=mem.toExponential(decimales);
    docAz.textContent=pile2.toExponential(decimales);
    docAy.textContent=pile1.toExponential(decimales);
    docAx.textContent=zaff;
  }
    
  }
}

function testposentree(z){ 
  // evalue posentree en fonction de entree
  dern=z.substr(-1,1); // dernier caractere
  avDern=z.substr(-2,1); // avant dernier caractere
  if (z.includes('E')===true){posentree='exp'}
  else if (z.includes('.')===true) {posentree='dec'}
  else if (z.length===0) {posentree='vide'}
  else {posentree='ent'}
  if (posentree==='ent') {
    if (dern==='-') {posentree='ent1'}
    else {posentree='ent2'}
  }
  if (posentree==='exp'){
    if (dern==='E') {posentree='exp1'}
    else if (dern==='-') {posentree='exp2'}
    else if (numerique.includes(avDern)===true){posentree='full'}
    else {posentree='exp3'}
  }
  if (z.length>14) {posentree='full'} // 15 caracteres 
}


function frac(x) {
  // retourne partie fractionnaire d'un nombre
  let y=parseFloat(x); //converti en nombre si besoin
  y= y-Math.floor(y);
  return y;
}

function fUp(){ 
  // decale pile vers le haut
  pile2=pile1;
  pile1=pile0;
  pile0=0;
} // fin function fUp

function fDown(){ 
  //decale pile vers le bas
  pile0=pile1;
  pile1=pile2;
  pile2=0;
}

function fEnter(){ 
  // si entree = '' la touche ENTER est inactive
  if (entree!==''){pile0=parseFloat(entree);entree='';}
  //else {return}
}

// ----------------------------------------------------------
//              fonctions des boutons
// ----------------------------------------------------------


function boutonBlanc(x) {
  // gestion des touches blanches , entree d'un nombre
  
  testposentree(entree); // definit valeur de posentree
  var valx=""; // valeur en caractere de l´id x 
  
  xde0a9=false;
  
  if (x==="b0") {xde0a9=true;valx="0"}
  if (x==="b1") {xde0a9=true;valx="1"}
  if (x==="b2") {xde0a9=true;valx="2"}
  if (x==="b3") {xde0a9=true;valx="3"}
  if (x==="b4") {xde0a9=true;valx="4"}
  if (x==="b5") {xde0a9=true;valx="5"}
  if (x==="b6") {xde0a9=true;valx="6"}
  if (x==="b7") {xde0a9=true;valx="7"}
  if (x==="b8") {xde0a9=true;valx="8"}
  if (x==="b9") {xde0a9=true;valx="9"}
  
  if (x==="bmoins") {valx="-"}
  if (x==="bpoint") {valx="."}
  if (x==="be") {valx="E"}
  
  // si touche blanche pressee annule touche jaune
  clicBjaune=false; // raz touche jaune avant affichage pile
  docAjaune.textContent="";
  
  if (posentree==='full'){// nombre digits plein seuls AC et C sont possibles
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    affichageInput(entree);
    return;}
  if (posentree==='vide'){ // premier digit, C et AC interdits
    if (xde0a9===true) {entree=valx}
    if (x==='bmoins') {entree=valx}
    if (x==='bpoint') {entree='0.'}
    if (x==='be') {entree='1.0E'}
    if (entree!==''){fUp();affichagePile()}// decalage de pile
    affichageInput(entree);
    return;} 
  if (posentree==='ent1') { // partie entiere apres signe -
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {return} // signe - uniquement en premiere position
    if (x==='bpoint') {entree=entree+'0.'}
    if (x==='be') {entree=entree+'1.0E'}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  if (posentree==='ent2') { // partie entiere apres signe -
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {return} // signe - uniquement en premiere position
    if (x==='bpoint') {entree=entree+valx}
    if (x==='be') {entree=entree+valx}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  if (posentree==='dec'){ // partie decimale
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {return} // signe - uniquement en premiere position
    if (x==='bpoint') {return}
    if (x==='be') {entree=entree+valx}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  if (posentree==='exp1') { // premier digit de l exposant
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {entree=entree+valx}
    if (x==='bpoint') {return}
    if (x==='be') {return}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  if (posentree==='exp2') { // deuxieme digit de l exposant
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {return}
    if (x==='bpoint') {return}
    if (x==='be') {return}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  if (posentree==='exp3'){ // troisieme digit de l exposant
    //if (x==='AC'){entree=''}
    if (x==='bc'){entree=entree.substr(0,entree.length-1)}
    if (x==='bmoins') {return}
    if (x==='bpoint') {return}
    if (x==='be') {return}
    if (xde0a9===true) {entree=entree+valx}
    affichageInput(entree);
    return;}
  else {return}
  
} // fin de boutonBlanc
 
function boutonGris(x){
  // gestion des boutons gris, gestion pile et autres
  
  var r=0;// variable locale pour calculs
  
  if (clicBjaune===false) { // partie haute du bouton
    if (x==='bswap'){r=pile0;pile0=pile1;pile1=r}
    if (x==='bdup'){fUp();pile0=pile1}
    if (x==='bsto'){fEnter();mem=pile0}
    if (x==='bdeg'){Vdegrad='DEG'} 
    if (x==='bfix'){Vfixsci='FIX'} 
    if (x==='bdplus'){if (decimales<8){decimales +=1}} // D+
    if (x==='bcstk'){pile0=0;pile1=0;pile2=0;mem=0}
  }
  else { // partie basse du bouton
    if (x==='bswap'){fDown()} // drop
    if (x==='bdup'){fEnter();pile0=-pile0} // chs
    if (x==='bsto'){fEnter();fUp();pile0=mem} //rcl 
    if (x==='bdeg'){Vdegrad='RAD';warning=x} // rad
    if (x==='bfix'){Vfixsci='SCI'} // sci
    if (x==='bdplus'){if (decimales>0){decimales -=1}} // D-
  }
  
  if (x==='benter'){fEnter()};// fEnter affiche deja results
  if (x==='bpi'){fEnter();fUp();pile0=Math.PI} 
  //if (x==='bdplus'){if (decimales<8){decimales +=1}} 
  //if (x==='bdmoins'){if (decimales>0){decimales -=1}} 
  
  clicBjaune=false; // raz touche jaune avant affichage pile
  affichagePile(); 
} // fin de boutonGris

function boutonBleu(x){
  // gestion des touches bleus, calculs
  
  var r=0; // variable locale pour calculs
  
  if (x==='bdiv'){
    fEnter();
    r=pile1/pile0;
    if (isNaN(r)) {warning=listWarning[4]} // erreur div par 0
    else if (Math.abs(r)>maxNumber) {warning=listWarning[2]} // erreur max number
    else {pile1=r;fDown()}
    }
  if (x==='bmul'){fEnter();pile1=pile1*pile0;fDown()}
  if (x==='bminu'){fEnter();pile1=pile1-pile0;fDown()}
  if (x==='bplus'){fEnter();pile1=pile1+pile0;fDown()}
  
  if (clicBjaune===false) { // partie haute du bouton
    if (x==='bsin'){
    fEnter();
    if (Vdegrad==='DEG'){r=pile0/180*Math.PI}
    else {r=pile0}
    pile0=Math.sin(r); //  r en radians
    }
    
    if (x==='bcos'){
    fEnter();
    if (Vdegrad==='DEG'){r=pile0/180*Math.PI}
    else {r=pile0}
    pile0=Math.cos(r); //  r en radians 
    }
    
    if (x==='btan'){
    fEnter();
    if (Vdegrad==='DEG'){r=pile0/180*Math.PI} else {r=pile0} 
    r=Math.tan(r);
    if ((Math.abs(r)>maxNumber)||(Math.abs(r)>bigNumber)) {warning=listWarning[2]} // gestion imprecision Math.tan
    else {pile0=r}
    }
    
    if (x==='blog'){
    fEnter();
    r=Math.log10(pile0);
    if (isNaN(r)) {warning=listWarning[1]} // val negative
    if (Math.abs(r)>maxNumber) {warning=listWarning[2];flagR=false} // val 0
    else {pile0=r}
    }
    
    if (x==='bln'){
    fEnter();
    r=Math.log(pile0);
    if (isNaN(r)) {warning=listWarning[1]} // val negative
    if (Math.abs(r)>maxNumber) {warning=listWarning[2];flagR=false} // val 0
    else {pile0=r}
    }
    
    if (x==='bsqrt'){
    fEnter();
    r=Math.sqrt(pile0);
    if (isNaN(r)) {warning=listWarning[1]} // val negative
    else {pile0=r}
    }
  }
  else { // partie basse du bouton
    if (x==='bsin'){ // asin
    fEnter();
    r=Math.asin(pile0); // en radians
    if (isNaN(r)) {warning=listWarning[2]} // val sup a 1 ou inf a -1
    else {if (Vdegrad==='DEG'){r=r/Math.PI*180}; pile0=r}
    }
    
    if (x==='bcos'){ // acos
    fEnter();
    r=Math.acos(pile0); // en radians
    if (isNaN(r)) {warning=listWarning[1]} // val sup a 1 ou inf a -1
    else {if (Vdegrad==='DEG'){r=r/Math.PI*180}; pile0=r}
    } 
  
    if (x==='btan'){ // atan
    fEnter();
    //alert("ATAN")
    r=Math.atan(pile0); // en radians
    if (Vdegrad==='DEG'){r=r/Math.PI*180}
    pile0=r;
    } 
  
    if (x==='blog'){ // pwr
    fEnter();
    r=Math.pow(pile0,pile1);
    if (Math.abs(r)>maxNumber) {warning=listWarning[2]}
    else {pile1=r;fDown()}
    }
  
    if (x==='bln'){ // exp
    fEnter();
    r=Math.exp(pile0);
    if (Math.abs(r)>maxNumber) {warning=listWarning[2]}
    else {pile0=r}
    }
  
    if (x==='bsqrt'){ //x2
    fEnter();
    r=pile0*pile0;
    if (Math.abs(r)>maxNumber) {warning=listWarning[2]}
    else {pile0=r}
    }
  }
  
  /*
  if (x==='INV'){
    fEnter();
    r=1/pile0;
    if (Math.abs(r)>maxNumber) {warning=listWarning[2];flagR=false}
    else {pile0=r}
  }
  */ 
  
  clicBjaune=false; // raz touche jaune avant affichage pile
  affichagePile();

} // fin de boutonBleu

function boutonJaune(x){
  // gestion de la touche jaune
  
  if (x==='bj') {
  if (clicBjaune===false) {clicBjaune=true;}
  else {clicBjaune=false}
}
  
  affichageInfo(); 
} // fin de boutonJaune

// ----------------------------------------------------------
//                lancement du script
// ----------------------------------------------------------
affichagePile();

//    fin du script 