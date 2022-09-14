//Login
function login(event){
const loginForm = document.querySelector("#login")
event.preventDefault();
let userName = loginForm.username.value;
let passWord = loginForm.password.value;
console.log(userName, passWord);
sessionStorage.setItem("userLoginIN", [userName, passWord]);
const loginUser = sessionStorage.getItem("userLoginIN");

if(userName == "" || passWord == ""){
    let loginNo = document.createElement("div");
    loginNo.innerHTML = `<h3 class="mt-2">Por favor complete todos los campos</h3>`
    loginForm.appendChild(loginNo);
}else {
    let loginOK = document.getElementById("page");
    loginOK.className = "d-block";
    loginForm.className = "d-none";
    }
}



class Usuario {
    constructor (fName, lName, age, documento, estadoCivil, income, gastos, rDependencia, actividad, montoASolicitar, id, counter){
        this.fName = fName;
        this.lName = lName;
        this.age = parseInt(age);
        this.documento = parseInt(documento);
        this.estadoCivil = estadoCivil;
        this.income = parseInt(income);
        this.gastos = parseInt(gastos);
        this.rDependencia = rDependencia;
        this.actividad = actividad;
        this.montoASolicitar = parseInt(montoASolicitar);
        this.id = id;
        this.counter = counter;
    }
}


let usuarios = [];
let counter = 1;
let sector = document.querySelector("#usuario ubody");
const userForm = document.querySelector('#addUser');
updateUserHTML();


//Add User
function agregarUsuario(){
    console.log(userForm.idUser)
    if (userForm.idUser && userForm.idUser !=0){
        for (let index = 0; index < usuarios.length; index++) {
            if (usuarios[index].id == userForm.idUser){
                usuarios[index].fName = userForm.fName.value;
                usuarios[index].lName = userForm.lName.value;
                usuarios[index].age = userForm.age.value;
                usuarios[index].documento = userForm.documento.value;
                usuarios[index].estadoCivil = userForm.estadoCivil.value;
                usuarios[index].income = userForm.income.value;
                usuarios[index].gastos = userForm.gastos.value;
                usuarios[index].rDependencia = userForm.rDependencia.value;
                usuarios[index].actividad = userForm.actividad.value;
                usuarios[index].montoASolicitar = userForm.montoASolicitar.value;
                break;
            }  
        }
        userForm["idUser"] = 0;
        updateUserHTML();
        updateSec();
    }else{
        //Create User
        let newUser = new Usuario(userForm.fName.value,
            userForm.lName.value,
            userForm.age.value,
            userForm.documento.value,
            userForm.estadoCivil.value,
            userForm.income.value,
            userForm.gastos.value,
            userForm.rDependencia.value,
            userForm.actividad.value,
            userForm.montoASolicitar.value,
            usuarios.length + 1,
            counter);
        usuarios.push(newUser);
        const usuariosJSON = (user, valor) => {localStorage.setItem(user,valor)};
        for (const user of usuarios) {
            usuariosJSON(user.fName, JSON.stringify(user))
        }
        counter++;
        console.log(usuarios);
        updateUserHTML();
        updateSec();
    }
}


function updateUserHTML(){
    sector.innerHTML = "";
    usuarios.forEach((user) => {
        let cont = document.createElement("div");
        cont.setAttribute("class", "col-md-3" )
        cont.innerHTML = `<h3>${user.fName} ${user.lName} </h3>
                        <p>Edad: ${user.age}</p>
                        <p>Documento: ${user.documento}</p>
                        <p>Estado Civil: ${user.estadoCivil}</p>
                        <p>Ingreso: ${user.income}</p>
                        <p>Gastos: ${user.gastos}</p>
                        <p>Relacion de dependencia: ${user.rDependencia}</p>
                        <p>Actividad: ${user.actividad}</p>
                        <p>Monto a Solicitar: ${user.montoASolicitar}</p>
                        <button id="editBtn_${user.counter}" type="button" class="btn btn-primary" onclick="editUsuario(event)" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button id="deleteBtn_${user.counter}" type="button" class="btn btn-danger" onclick="deleteUsuario(event)">Delete</button>
                        `;
        sector.appendChild(cont);
    } )
}

//Delete User
function deleteUsuario(event){
    const btn = event.target;
    const coun = btn.id.split('_')[1];
    usuarios = usuarios.filter((users) => users.counter != coun);
    console.log(usuarios)
    updateUserHTML()
    updateSec()

}


//Edit User
function editUsuario (event){
    const btn = event.target;
    const coun = btn.id.split('_')[1];
    const user = usuarios.filter((user) => user.counter == coun)[0];
    userForm.fName.value = user.fName;
    userForm.lName.value = user.lName;
    userForm.age.value = user.age;
    userForm.documento.value = user.documento;
    userForm.estadoCivil.value = user.estadoCivil;
    userForm.income.value = user.income;
    userForm.gastos.value = user.gastos;
    userForm.rDependencia.value = user.rDependencia;
    userForm.actividad.value = user.actividad;
    userForm.montoASolicitar.value = user.montoASolicitar;
    userForm["idUser"] = user.id;
    console.dir(userForm["idUser"]);
    console.log(user);
    
}




//Simulador
let miSimulador = document.querySelector("#simulador select");

function updateSec (){
    miSimulador.innerHTML="";
    for (let index = 0; index < usuarios.length; index++) {
        let mes = document.createElement("option");
        mes.setAttribute("name", "fName" );
        mes.innerHTML = `${usuarios[index].counter}. ${usuarios[index].fName} ${usuarios[index].lName}`;
        miSimulador.appendChild(mes);
        
        
    }


/*
    usuarios.forEach((us) => {
        let mes = document.createElement("option");
        mes.setAttribute("name", "fName" );
        mes.innerHTML = `${usuarios.counter}. ${us.fName} ${us.lName}`;
        miSimulador.appendChild(mes);
    } )
*/
}


function iniSimulacion(){
    //console.log(miSimulador.fName.value)

    for (let index = 0; index < usuarios.length; index++) {
        if (usuarios[index].age <= 25 && usuarios[index].montoASolicitar >= 30000){
            console.log("No le podremos dar un prestamo");
            alert("No le podremos dar un prestamo");
        }
        else if (usuarios[index].income <= usuarios[index].montoASolicitar / 60) {
            console.log("No sera posible otorgarle un prestamo");
            alert("No sera posible otorgarle un prestamo");
        }
        else if(usuarios[index].gastos >= usuarios[index].income ) {
            console.log("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos");
            alert("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos")
        }
        else {
            console.log("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
            alert("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
        }       
    }
/*
    let userE = parseInt((miSimulador.userElegido.value));
    let userElegido = userE - 1;

        if (usuarios[userElegido].age <= 25 && usuarios[0].montoASolicitar >= 30000){
            console.log("No le podremos dar un prestamo");
            alert("No le podremos dar un prestamo");
        }
        else if (usuarios[userElegido].income <= usuarios[userElegido].montoASolicitar / 60) {
            console.log("No sera posible otorgarle un prestamo");
            alert("No sera posible otorgarle un prestamo");
        }
        else if(usuarios[userElegido].gastos >= usuarios[userElegido].income ) {
            console.log("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos");
            alert("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos")
        }
        else {
            console.log("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
            alert("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
    }
*/
}

















/*
let fName;
let lName;
let age;
let documento;
let estadoCivil;
let income;
let gastos;
let rDependencia;
let actividad;
let montoASolicitar;

let sector = document.querySelector("#usuario div");
updateUserHTML();


let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", agregarUsuario);

function agregarUsuario (usuario){
    usuario.preventDefault()
    fName = (formulario.children[0].value);
    lName = (formulario.children[1].value);
    age = (formulario.children[2].value);
    documento = (formulario.children[3].value);
    estadoCivil = (formulario.children[4].value);
    income = (formulario.children[5].value);
    gastos = (formulario.children[6].value);
    rDependencia = (formulario.children[7].value);
    actividad = (formulario.children[8].value);
    montoASolicitar = (formulario.children[9].value); 
    let newUser = new Usuario(fName, lName, age, documento, estadoCivil,
        income, gastos, rDependencia, actividad, montoASolicitar, usuarios.length + 1);
    usuarios.push(newUser);
    console.log("se agrego el usuario", newUser);
    alert(`Se agrego el usuario ${newUser.fName} ${newUser.lName}`)
    updateUserHTML()
}




function updateUserHTML(){
    sector.innerHTML = "";
    usuarios.forEach((user) => {
        let cont = document.createElement("div");

        cont.innerHTML = `<h3>${user.fName} ${user.lName} </h3>
                        <p>ID: ${user.id}</p>
                        <p>Edad: ${user.age}</p>
                        <p>Documento: ${user.documento}</p>
                        <p>Estado Civil: ${user.estadoCivil}</p>
                        <p>Ingreso: ${user.income}</p>
                        <p>Gastos: ${user.gastos}</p>
                        <p>Relacion de dependencia: ${user.rDependencia}</p>
                        <p>Actividad: ${user.actividad}</p>
                        <p>Monto a Solicitar: ${user.montoASolicitar}</p>`;
        sector.appendChild(cont);
    } )
}


//Simulador
let miSimulador = document.querySelector("#simulador");
miSimulador.addEventListener("submit", iniSimulacion);


function iniSimulacion(usuario){
    usuario.preventDefault();
    let userE = parseInt((simulador.userElegido.value));
    let userElegido = userE - 1;

        if (usuarios[userElegido].age <= 25 && usuarios[0].montoASolicitar >= 30000){
            console.log("No le podremos dar un prestamo");
            alert("No le podremos dar un prestamo");
        }
        else if (usuarios[userElegido].income <= usuarios[userElegido].montoASolicitar / 60) {
            console.log("No sera posible otorgarle un prestamo");
            alert("No sera posible otorgarle un prestamo");
        }
        else if(usuarios[userElegido].gastos >= usuarios[userElegido].income ) {
            console.log("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos");
            alert("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos")
        }
        else {
            console.log("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
            alert("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
    }
}


*/













//Codigo Pre entrega 1


/*
//Cycle
do {
    option = parseInt(prompt(`Ingrese 1 para agregar usuario. \nIngrese 2 para ver un usuario.
Ingrese 3 para ver todos los usuarios creados. \nIngrese 4 para eliminar un usuario.
Ingrese 5 para eliminar todos los usuarios. \nIngrese 6 para que empiece la simulacion. \nIngrese 7 para salir.`));
    switch (option) {
        case 1:
            agregarUsuario(usuarios);
            break;
        case 2:
            verUsuario(usuarios);
            break;
        case 3:
            verTodosLosUsuarios(usuarios);
            break;
        case 4:
            eliminarUsuario(usuarios);
            break;
        case 5:
            eliminarTodos(usuarios);
            break;
        case 6:
            iniSimulacion(usuarios);
        default:
            break;
    }   
} while (option != 7);



//Agregar Usuario
function agregarUsuario (usuarios){
    let fName = prompt("Ingrese Nombre");
    let lName = prompt("Ingrese Apellido");
    let age = parseInt(prompt("Ingrese Edad"));
    let document = parseInt(prompt("Ingrese Documento"));
    let estadoCivil = prompt("Ingrese su estado civil \n Casado/a - Soltero/a")
    if (estadoCivil == "casado" || estadoCivil == "Casado" 
    || estadoCivil == "casada" || estadoCivil == "Casada"){
        estadoCasado(estadoCivil)
    }
    let income = parseInt(prompt("Ingrese su sueldo neto mensual en USD"));
    let gastos = parseInt(prompt("Ingrese sus gastos mensuales en USD"));
    let rDependencia = prompt("Trabajas en relacion de dependencia?");
    let actividad = prompt("Tipo de trabajo");
    let montoASolicitar = parseInt(prompt("Ingrese el monto que desea solicitar en USD"));

    let newUser = new Usuario(fName, lName, age, document, estadoCivil,
        income, gastos, rDependencia, actividad, montoASolicitar, usuarios.length + 1);
    usuarios.push(newUser);
    console.log("se agrego el usuario", newUser);
    alert(`Se agrego el usuario ${newUser.fName} ${newUser.lName}`)
}


function estadoCasado (estadoCivil){
    let family = parseInt(prompt("Ingrese cantidad de Hijos/as"));
        if (family <=10){
            for (index = 1; index <= family; index++){
            let nameHijos = prompt("Ingrese nombre de su hijo N" + index)     
            }
        }
}

//Add User to HTML
for (const usuario of usuarios) {
    let sec = document.getElementById("usuario");
    let cont = document.createElement("div");

    cont.innerHTML = `<h3>${usuario.fName} ${usuario.lName} </h3>
                    <p>Edad: ${usuario.age}</p>
                    <p>Documento: ${usuario.document}</p>
                    <p>Estado Civil: ${usuario.estadoCivil}</p>
                    <p>Ingreso: ${usuario.income}</p>
                    <p>Gastos: ${usuario.gastos}</p>
                    <p>Relacion de dependencia: ${usuario.rDependencia}</p>
                    <p>Actividad: ${usuario.actividad}</p>
                    <p>Monto a Solicitar: ${usuario.montoASolicitar}</p>
                    <p>ID: ${usuario.id}</p>`;
    sec.appendChild(cont);
    
}


//Ver UN usuario
function verUsuario(usuarios){
    let texto = "";
    for (let index = 0; index < usuarios.length; index++) {
        texto = texto.concat(
            `Ingrese ${index + 1} para el usuario ${usuarios[index].fName} \n`
        );      
    }
    const option = parseInt(prompt(texto));
    console.log("Usuario pedido:", usuarios[option - 1]);
    alert(`En la consola podra ver los datos del usuario`);
}


//Ver TODOS los usuarios
function verTodosLosUsuarios(usuarios) {
    for (const user of usuarios) {
        console.log(user);
    }
}


//Eliminar un usuario
function eliminarUsuario(usuarios){
    let text3 = "";
    for (let index = 0; index < usuarios.length; index++) {
        text3 = text3.concat(
            `Ingrese ${index + 1} para el usuario ${usuarios[index].fName} \n`
            ); 
    }
    const numeroElegido = parseInt(prompt(text3));
    const userElegido = numeroElegido - 1;
    usuarios.splice(userElegido,1);
    console.log(usuarios);
}


//Eliminar todos los usuarios
function eliminarTodos(usuarios){
    usuarios.splice(0, usuarios.length);
    console.log("Todos los usuarios fueron eliminados correctamente");
    alert("Todos los usuarios fueron eliminados correctamente");
}


//Simulador
function iniSimulacion(usuarios){
    let text2 = "";
    for (let index = 0; index < usuarios.length; index++) {
        text2 = text2.concat(
            `Ingrese ${index + 1} para el usuario ${usuarios[index].fName} \n`
        );      
    }
    const numeroElegido = parseInt(prompt(text2));
    const userElegido = numeroElegido - 1;
        if (usuarios[userElegido].age <= 25 && usuarios[userElegido].montoASolicitar >= 30000){
            console.log("No le podremos dar un prestamo");
            alert("No le podremos dar un prestamo");
        }
        else if (usuarios[userElegido].income <= usuarios[userElegido].montoASolicitar / 60) {
            console.log("No sera posible otorgarle un prestamo");
            alert("No sera posible otorgarle un prestamo");
        }
        else if(usuarios[userElegido].gastos >= usuarios[userElegido].income ) {
            console.log("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos");
            alert("No sera posible otorgarle un prestamo. Sus gastos son mayores o iguales a sus ingresos")
        }
        else {
            console.log("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
            alert("Fue aceptado para recibir un prestamo. Nos estaremos contactando con usted");
    }
}
*/