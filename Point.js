// un vector
function Point()
{
}

Point.prototype.x = 0;
Point.prototype.y = 0;

// longitud pitagorica del vector
Point.prototype.Length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

// longitud pitagorica cuadrada del vector. Mas rapida
Point.prototype.SquaredLength = function()
{
	return this.x * this.x + this.y * this.y;
}

// Normalizar el vector a longitud 1
Point.prototype.Normalize = function()
{
	// obtener la longitud
	var length = this.Length();
	
	this.x /= length;
	this.y /= length;
}

Point.prototype.Add = function(other)
{
	this.x += other.x;
	this.y += other.y;
}

Point.prototype.Subtract = function(other)
{
	this.x -= other.x;
	this.y -= other.y;
}

Point.prototype.Multiply = function(mult)
{
	this.x *= mult;
	this.y *= mult;
}

Point.prototype.Dist = function(other)
{
	var dx = this.x - other.x;
	var dy = this.y - other.y;
	
	return Math.sqrt((dx * dx) + (dy * dy));
}

Point.prototype.DistSqr = function(other)
{
	var dx = this.x - other.x;
	var dy = this.y - other.y;
	
	return (dx * dx) + (dy * dy);
}