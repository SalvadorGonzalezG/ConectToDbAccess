// creando una funcion para que los datos sean creados despues de que pantalla se cargo completamente
document.addEventListener('DOMContentLoaded', function(){
    // creando variable donde se almacenaran los datos obtenidos del formulario
    const form = document.getElementById('formDatos')

    // funcion del mismo formulario de tipo submit
    form.addEventListener('submit', function(e){
        e.preventDefault()

        // variable que obtiene el objeto de los datos ingresados despues de presionar el boton submit
        const formData = new FormData(form)

        // fetch de tipo post la cual ingresera los datos en la ruta definida
        fetch('http://localhost:3000/registro',{
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data =>{
            alert(data)
            form.reset()
        })
        .catch(error =>{
            console.error('error', error)
        })

    })
})