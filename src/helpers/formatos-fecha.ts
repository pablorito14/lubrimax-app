export const formatoDDMMMYYYY = (d: number,m: number,a: number) => {
	var fecha:string = '';
	var arrMeses = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"];

	// var arrFecha = d.split('/');

	// var dia = arrFecha[parseInt(d)];
	// var mes = parseInt(arrFecha[parseInt(m)])-1;
	// var anio = arrFecha[parseInt(a)];
	
	// var dia = parseInt(d);
	// var mes = parseInt(m)-1;
	// var anio = parseInt(a);

	// fecha = dia+' de '+arrMeses[mes]+', '+anio;
	fecha = d+' de '+arrMeses[m-1]+', '+a;

	return fecha;
}