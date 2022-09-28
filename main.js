// Array de productos
const productos = {
    producto1: {
      nombre: 'Nikon d750',
      precio: '900',
      descripcion: 'Cuerpo de cámara Nikon D750 DSLR, nuevo, con lente Nikon AF-S NIKKOR 24-120mm f/4G ED VR',
      srcImg: 'https://ae01.alicdn.com/kf/U6cb614acf2a74bc4a2c4a8e0ba286485W/Cuerpo-de-c-mara-Nikon-D750-DSLR-nuevo-con-lente-Nikon-AF-S-NIKKOR-24-120mm.jpg'
    },
    producto2: {
      nombre: 'Sony a6400',
      precio: '1200',
      descripcion: 'Sony Alpha 6400 ILCE-6400 sin espejo color negro con objetivo 16-50mm',
      srcImg: 'https://camara.pro/wp-content/uploads/2019/10/Sony-A6400-Principal.jpg'
    },
    producto3: {
      nombre: 'AF-S NIKKOR 24-120mm f/4G ED VR ',
      precio: '800',
      descripcion: 'Objetivo zoom de 5 aumentos de alto rendimiento, rango focal versátil con un diafragma de f/4 constante de . ',
      srcImg: 'https://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-fTYlSZPBjlMhlFa1VHARsAMnUXbUr7pX3p70soZzSPPaGjVNII1ykJr-QZKGOKBmu37Vythl_tQ==/Views/2193_AFS-NIKKOR-24-120mm-f4GEDVR_front.png'
    },
    producto4: {
      nombre: 'Sony a7III',
      precio: '1300',
      descripcion: 'Alpha 7 III con sensor de imagen full-frame de 35 mm sin espejo, con montura E',
      srcImg: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqu8oK5RJj2IzDOzV0TZXJh5VHyMRCQVYNqmqJEkndhIjSZ1U4LFecP27ea4h1LdKzaSWudMSIdf-i2hUgMMjF-s_KKchC'
    }
  }
  // Se captura el template de los productos
  const templateProd = document.getElementById('template-prod').content
  const contenedorProd = document.querySelector('.contenedor-productos')
  const fragment = document.createDocumentFragment()
  
  
  // TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
  Object.values(productos).forEach( producto => {
    templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
    templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
    templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
    templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
    templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
    const clone = templateProd.cloneNode(true)
    fragment.appendChild(clone)
  })
  contenedorProd.appendChild(fragment)
  
  // TODO LO RELACIONADO AL CARRITO DE COMPRA
  let carrito = {}
  const templateTabla = document.getElementById('agregar-producto-al-carro').content
  const tbodyCarrito = document.getElementById('carrito-body')
  const fragmentTabla = document.createDocumentFragment()
  const templateFoot = document.getElementById('tfooter').content
  const tfootCarrito = document.getElementById('footer')
  
  contenedorProd.addEventListener('click', e => {
    
    if(e.target.textContent === "Agregar") {
      setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
  })
  const setCarrito = e => {
    const pivoteCarrito = {
      nombre: e.querySelector('.div-info .nombre-prod').textContent,
      precio: e.querySelector('.div-precio-boton .precio').textContent,
      cantidad: 1
    }
    if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
      carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
      carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
    }
    pintarTabla(carrito)
  }
  
  const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach( objeto => {
      const cloneTabla = templateTabla.cloneNode(true)
      cloneTabla.getElementById('producto').textContent = objeto.nombre
      cloneTabla.getElementById('cant').textContent = objeto.cantidad
      cloneTabla.getElementById('precio-uni').textContent = objeto.precio
      let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
      cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
      fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
  }
  const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
      tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
      const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
      templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
      const cloneFoot = templateFoot.cloneNode(true)
      fragment.appendChild(cloneFoot)
      tfootCarrito.appendChild(fragment)
      //Boton Vaciar carrito
      const botonVaciar = document.getElementById('vaciar-tabla')
  botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarTabla(carrito)
        pintarFooter()
      })
      
      //Botones aumentar y disminuir cantidades
      
    }
  }
  tbodyCarrito.addEventListener('click', e => {
    
    if(e.target.classList.contains('button')) {
      aumentarDisminuir(e.target)
    }
  })
  const aumentarDisminuir = boton => {
    if(boton.textContent === '+'){
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++  
        }
      })
    }
    if(boton.textContent === '-') {
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--
          if(carrito[elemento.nombre].cantidad === 0) {
            delete carrito[elemento.nombre]
          }
        }
      })
    }
    pintarTabla(carrito)
    pintarFooter()
  }