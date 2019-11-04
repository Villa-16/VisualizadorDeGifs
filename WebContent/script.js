

//Para mostrarlos, declarar un elemento para manipularlos despues.
//va a poner los gifs en 
var tablaGifs = document.getElementById("tabla-gifs"); 

//window.onload = CargarGifs; //ASIGNA LA FUNCION AL EVENTO windows.onload, cuando carga.

function CargarGifs(){
	
	//debemos obtener la informacion
	//declaramos variale
	//YA NO VAMOS A ESTAR EN EL SERVIDOR, SINO EN EL CLIENTE
	let request = new XMLHttpRequest();
	//CUANDO TENGA LA RESPUESTA, HACER ALGO CON ELLA
	
	//CUANDO EL ESTADO DE LA PETICION ESTE CAMBIANDO
	//CONFIGURAR QUE SE HACE CUANDO SE TIENE LA RESPUESTA.
	
	request.onreadystatechange = function(){
		console.log(this.readyState);//PARA MOSTRAR EN LA CONSOLA EL CAMBIO DE ESTADO.

		//readyState: Indica el estado (request finished and response is ready)
		//status: 200: "OK"
		if(this.readyState == 4 && this.status == 200){
			//tablaGifs.innerText = this.responseText;
			crearGifs(this.responseText);
		}
	};
	//EXPLICAR EL METODO QUE SE REALIZARA, JUNTO CON EL ARCHIVO O LA URL DEL DESTINO, DONDE SE ENCUENTRA LA INFO
	request.open("GET", "gifs.json", true);
	//SE ENVIA 
	request.send();
}

function cargarGifsGiphy(query){
	let request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		console.log(this.readyState);
		if(this.readyState == 4 && this.status == 200){
			
			crearGifsGiphy(this.responseText);
		}
	};
	//API KEY CON EL "?" para agregar el API de mi propia cuenta, que creamos, y CONCATENANDO LA QUERY QUE OBTIENE
	let url = "http://api.giphy.com/v1/gifs/search?api_key=Hy5fYULpjN1NByl7EGKWrgsCZcKvZMFT&q=" + query;
	//la url debe terminar en "&q=" para mantener el formato e ingresar la query
	request.open("GET", url, true);
	request.send();
	//AHORA SE NECESITA UN BOTON PARA PODER REALIZAR LA BUSQUEDA
	
}

//FUNCION PARA MANDAR LOS DATOS
function crearGifs(data){
	//PARSEAR LOS DATOS DE JASON PARA PARSEARLOS Y CONVERTIRLOS A UNA LISTA DE OBJETOS EN JAVASCRIPT
	let listaGifs = JSON.parse(data);
	//PARA PROCESAR LA INFORMACION Y RECORRER LA LISTA, DEBEMOS VERIFICAR EL JSON EN INTERNET PARA VERIFICAR ERRORES
	for(let i=0; i < listaGifs.length; i++){
		
		let gif = listaGifs[i];
		//CREAR ELEMENTO, VARIABLE, DONDE SE MANDARA EL GIF
		//FUNCION PARA CREAR ELEMENTO
		crearElementoImg(gif);
	}
}

function crearGifsGiphy(data){
	//location.reload(true);
	let respuestaGiphy = JSON.parse(data);
	//SE RECORRERA
	for(let i = 0; i < respuestaGiphy.data.length; i++){
		let image = respuestaGiphy.data[i];
		
		//FUNCION PARA CREAR ELEMENTO image:objeto, images:del JSON, original:para obtener el url del campo original
		//FORMA PARA ACCEDER A LA DIRECCION
		crearElementoImg(image.images.original);
	}
}

function buscarGifs(event){
	let txtBusqueda = document.getElementById("txtBusqueda");
	
	//OBTENER EL TEXTO DE LA CAJA, (BUSQUEDA) 
	let valor = txtBusqueda.value;
	
	//PARA UTILIZAR
	cargarGifsGiphy(valor);
}

function crearElementoImg(gif){
	//PARA CRAR ELEMENTOS EN LA VISTA HTML
	location.reload(true);
	let contImg = document.createElement("div");
	let img = document.createElement("img");
	
	img.src = gif.url;
	
	contImg.appendChild(img);
	tablaGifs.appendChild(contImg);
}