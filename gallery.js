function Gallery(container, photoArray) {
    this._galleryHolder = {};
    this._fullsizeGallery = {};
    this._thumbnailCollection = [];

    //Método privado que genera eventos de click sobre la colección de thumbnails
    function associateThumbEvents() {
        var currentInstance = this;

        this._thumbnailCollection = this._galleryHolder.getElementsByClassName("thumbnail");

        for (var x = 0; x < this._thumbnailCollection.length; x++) {
            this._thumbnailCollection[x].addEventListener("click", function (event) { thumbnailClick.call(currentInstance, event); });
        }
    }

    //Método privado que comprueba si se han podido cargar las imágenes tras cinco segundos
    function checkThumbGallery(loadedImages, currentInstance) {
        console.log("No han podido cargarse " + (photoArray.length - loadedImages) + " imágenes de la galería");
        thumbnailGallery.innerHTML = tempGallery;
        associateThumbEvents.call(currentInstance);
    }

    //Método privado que define los eventos de click sobre los thumbnails
    function thumbnailClick(event) {

        var currentInstance = this; //Esta variable se utilizará para poder acceder a this dentro de los listeners.

        function loadImageLayer(image, imageClass) {
            var thisPhoto = document.createElement("img");
            thisPhoto.setAttribute("src", image.src);
            thisPhoto.setAttribute("class", imageClass);
            if (thisPhoto.height > 600 || thisPhoto.width > 800) {
                thisPhoto.setAttribute("height", 600);
                thisPhoto.setAttribute("width", 800);
            }
            this._fullsizeGallery.appendChild(thisPhoto);
            return thisPhoto;
        }

        function repositionButtons(image) {
            var wDisplacement = (image.width + 50) / 2;
            var hDisplacement = 90 + ((image.height) / 2);
            previousButton.setAttribute("style", "top:" + hDisplacement + "px; left:-" + wDisplacement + "px;");
            nextButton.setAttribute("style", "top:" + hDisplacement + "px; left:" + wDisplacement + "px;");
        }

        //Se carga la foto sobre la que se hace click en la galería de tamaño completo, así como las fotos previa y siguiente
        var currentImage = event.target;
        var previousImage = (currentImage.previousElementSibling != null) ? currentImage.previousElementSibling
            : this._thumbnailCollection[this._thumbnailCollection.length - 1];
        var nextImage = (currentImage.nextElementSibling != null) ? currentImage.nextElementSibling : this._thumbnailCollection[0];

        var previousPhoto = loadImageLayer.call(this, previousImage, "previousPhoto");
        var currentPhoto = loadImageLayer.call(this, currentImage, "currentPhoto");
        var nextPhoto = loadImageLayer.call(this, nextImage, "nextPhoto");

        //Se añaden botones para moverse por la galería
        var previousButton = document.createElement("div");
        var nextButton = document.createElement("div");
        previousButton.setAttribute("class", "galleryButton fa fa-chevron-circle-left");
        nextButton.setAttribute("class", "galleryButton fa fa-chevron-circle-right");
        repositionButtons(currentPhoto);

        this._fullsizeGallery.appendChild(previousButton);
        this._fullsizeGallery.appendChild(nextButton);

        //Se hace visible la capa modal de la galería de tamaño completo
        this._fullsizeGallery.style.display = "block";

        //Se añade evento para cerrar la galería cuando se hace click en la capa superior
        this._fullsizeGallery.addEventListener("click", function (event) {
            currentInstance._fullsizeGallery.style.display = "none";
            currentInstance._fullsizeGallery.innerHTML = "";
        });

        //Y otro evento sobre la propia imagen para evitar que el click sobre ella dispare el click superior en la capa y no se cierre
        currentPhoto.addEventListener("click", function (event) { event.cancelBubble = true; });

        //Y los eventos de imagen adelante e imagen atrás.
        previousButton.addEventListener("click", function (event) {
            var newImage = previousImage;
            previousImage = (newImage.previousElementSibling != null) ? newImage.previousElementSibling
                : currentInstance._thumbnailCollection[currentInstance._thumbnailCollection.length - 1];
            nextImage = (newImage.nextElementSibling != null) ? newImage.nextElementSibling : currentInstance._thumbnailCollection[0];
            event.cancelBubble = true;
            repositionButtons(previousPhoto);
            currentPhoto.style.left = "1025px";
            currentPhoto.style.opacity = 0;
            previousPhoto.style.left = 0;
            previousPhoto.style.opacity = 1;
            currentInstance._fullsizeGallery.removeChild(nextPhoto);
            nextPhoto = currentPhoto;
            nextPhoto.setAttribute("class", "nextPhoto");
            currentPhoto = previousPhoto;
            currentPhoto.setAttribute("class", "currentPhoto");
            currentPhoto.addEventListener("click", function (event) { event.cancelBubble = true; });
            previousPhoto = loadImageLayer.call(currentInstance, previousImage, "previousPhoto");
        });

        nextButton.addEventListener("click", function (event) {
            var newImage = nextImage;
            nextImage = (newImage.nextElementSibling != null) ? newImage.nextElementSibling : currentInstance._thumbnailCollection[0];
            previousImage = (newImage.previousElementSibling != null) ? newImage.previousElementSibling
                : currentInstance._thumbnailCollection[currentInstance._thumbnailCollection.length - 1];
            event.cancelBubble = true;
            repositionButtons(nextPhoto);
            currentPhoto.style.left = "-1600px";
            currentPhoto.style.opacity = 0;
            nextPhoto.style.left = 0;
            nextPhoto.style.opacity = 1;
            currentInstance._fullsizeGallery.removeChild(previousPhoto);
            previousPhoto = currentPhoto;
            previousPhoto.setAttribute("class", "previousPhoto");
            currentPhoto = nextPhoto;
            currentPhoto.setAttribute("class", "currentPhoto");
            currentPhoto.addEventListener("click", function (event) { event.cancelBubble = true; });
            nextPhoto = loadImageLayer.call(currentInstance, nextImage, "nextPhoto");
        });
    }

    //Creación de la galería de thumbnails
    var thumbnailGallery = document.createElement("div");
    thumbnailGallery.setAttribute("class", "thumbnailGallery");
    this._galleryHolder = document.getElementById(container);
    this._galleryHolder.appendChild(thumbnailGallery);
    thumbnailGallery.innerHTML = "<div class=\"galleryLoader\"><p class=\"fa fa-spinner fa-spin\"></p> Gallery loading...</div>"

    if (photoArray.length == 0) {
        thumbnailGallery.innerHTML = "<div class=\"noData\">No hay imágenes asociadas</div>";
    } else {
        var loadedImages = 0;
        var tempGallery = "";
        var currentThumbnail = [];
        var currentInstance = this;
        var timeout = setTimeout(function () { checkThumbGallery(loadedImages, currentInstance); }, 5000);
        for (var image in photoArray) {
            currentThumbnail[image] = new Image();
            currentThumbnail[image].onload = function () {
                loadedImages++;
                tempGallery += "<img src=\"" + this.src + "\" width=\"200\" height=\"200\" alt=\"" + this.src + "\" class=\"thumbnail\" />";
                if (loadedImages >= photoArray.length) {
                    //Una vez cargadas todas las imágenes mostrar la galería y asociar eventos de click a los thumbnails
                    thumbnailGallery.innerHTML = tempGallery;
                    associateThumbEvents.call(currentInstance);
                    window.clearTimeout(timeout); //Si se dispara el evento que carga las imágenes se elimina el check a los 5 segundos.
                }
            }
            currentThumbnail[image].src = photoArray[image];
        }
    }

    //Creación del objeto que contendrá la galería en tamaño grande
    this._fullsizeGallery = document.createElement("div");
    this._fullsizeGallery.setAttribute("id", "fullsizeGallery");
    document.body.appendChild(this._fullsizeGallery);
}
