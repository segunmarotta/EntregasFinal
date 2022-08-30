//alert("Bienvendio a nuestro simulador de Prestamos");

//class Usuario {
    //constructor (fName, lName, age)
//}


let usuarios = [ 
    {
        fName: "Segundo",
        lName: "Marotta",
        age: 24,
    },
    {
        fName: "Felipe",
        lName: "Marotta",
        age: 28,
    }
]

/*
const ages = usuarios.map((us) => {
    return {
        age: us.age + 2,
    }
})
*/

const ages = usuarios.map((us) => {
    if (us.age == 28){
        return console.log("messi")
    }

})

//if (usuarios.map(x => x.age) //acceder valor objecto dentro del array
console.log(usuarios.map(x => x.age)); //acceder valor objecto dentro del array