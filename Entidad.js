function Entidad()
{
	// definimos los vectores dentro del constructor
	// para obtener instancias distintas en cada instancia
	this.m_vPos = new Point();	// posicion actual
	this.m_vDir = new Point();	// direccion actual
	this.m_vVel = new Point();	// velocidad actual
	
	this.m_fRadio = 0;
	
	// rapidez y aceleracion
	this.m_fRapidezMax = 0;		// rapidez maxima que podemos alcanzar
	this.m_fAceleracion = 0;	// aceleracion actual
	this.m_fFriccion = 0;		// friccion aplicada sobre la velocidad cada cuadro
	
	// valores angulares
	this.m_fAngulo = 0;				// angulo actual de movimiento
	this.m_fVelAngular = 0;			// velocidad angular actual
	this.m_fVelAngularMax = 0;		// velocidad angular maxima
	this.m_fAcAngular = 0;			// aceleracion angular actual
	this.m_fFriccionAngular = 0;	// friccion aplicada sobre la velocidad angular cada cuadro
	
	this.m_bDestruido = false;
	
	// estilo por defecto del div
	this.m_sEstilo = "CuadroRojo";
}

Entidad.prototype.CrearDiv = function()
{
	// crear el div
	this.m_pDiv = document.createElement("div");
	
	// aplicar el estilo del div
	this.m_pDiv.className = this.m_sEstilo;
	
	// agregar el div al body
	document.body.appendChild(this.m_pDiv);
	
	// actualizar la posicion del div
	this.ActualizarDiv();
}

Entidad.prototype.ActualizarDiv = function()
{
	// actualizar el div con la nueva posicion
	this.m_pDiv.style.top = (this.m_vPos.y - this.m_fRadio) + "px";
	this.m_pDiv.style.left = (this.m_vPos.x - this.m_fRadio) + "px";
	
	// actualizar el div con la nueva rotacion
	this.m_pDiv.style.webkitTransform = "rotate("+ this.m_fAngulo +"deg)"; 
    this.m_pDiv.style.mozTransform    = "rotate("+ this.m_fAngulo +"deg)"; 
    this.m_pDiv.style.msTransform     = "rotate("+ this.m_fAngulo +"deg)"; 
    this.m_pDiv.style.oTransform      = "rotate("+ this.m_fAngulo +"deg)"; 
	
	
    this.m_pDiv.style.transform       = "rotate("+ this.m_fAngulo +"deg)";
}

Entidad.prototype.EliminarDiv = function()
{
	// quitar el div del body
	document.body.removeChild(this.m_pDiv);
}

Entidad.prototype.Actualizar = function()
{
	// aplicar aceleracion angular
	this.m_fVelAngular += this.m_fAcAngular;
	
	// limitar la velocidad angular
	this.m_fVelAngular = Math.min(this.m_fVelAngular, this.m_fVelAngularMax);
	this.m_fVelAngular = Math.max(this.m_fVelAngular, -this.m_fVelAngularMax);
	
	// actualizar el angulo
	this.m_fAngulo += this.m_fVelAngular;
	
	// actualizar el vector de direccion
	this.m_vDir.x = Math.cos(this.m_fAngulo * Math.PI / 180.0);
	this.m_vDir.y = Math.sin(this.m_fAngulo * Math.PI / 180.0);
	
	// multiplicar la direccion por la rapidez para encontrar la velocidad
	this.m_vDir.x *= this.m_fAceleracion;
	this.m_vDir.y *= this.m_fAceleracion;
	
	this.m_vVel.Add(this.m_vDir);
	
	var longitud = this.m_vVel.Length();
	if(longitud > this.m_fRapidezMax)
	{
		this.m_vVel.Normalize();
		this.m_vVel.Multiply(this.m_fRapidezMax);
	}
		
	// actualizar la posicion
	this.m_vPos.Add(this.m_vVel);
	
	// chequear que la posicion no se salga de los limites de la pantalla
	if(this.m_vPos.x < 0) this.m_vPos.x += 500.0;
	if(this.m_vPos.x > 500) this.m_vPos.x -= 500.0;
	if(this.m_vPos.y < 0) this.m_vPos.y += 500.0;
	if(this.m_vPos.y > 500) this.m_vPos.y -= 500.0;
	
	// actualizar la posicion del div
	this.ActualizarDiv();
	
	// aplicar friccion a la velocidad angular
	this.m_fVelAngular -= this.m_fVelAngular * this.m_fFriccionAngular;
	
	// aplicar friccion a la rapidez
	this.m_vVel.x -= this.m_vVel.x * this.m_fFriccion;
	this.m_vVel.y -= this.m_vVel.y * this.m_fFriccion;
}