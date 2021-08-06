import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

export const listadoMantenimientos = (data:any) => {
  var mantenimientos:any = [];
  
  data.forEach((element:any) => {
    // console.log(element.payload.doc.id);
    // console.log(element.payload.doc.data().fUnix.seconds);
      
    var strTareas:string='';
    var strOthers:string=' -- ';

    var mant = element.payload.doc.data();
    var tareas:any = mant.accion;
    
    if(tareas.archivos){
      strTareas+='Limpieza de archivos temporales<br>';
    }

    var nombre:string  = mant.cod.toUpperCase();
    nombre = nombre.replace(/\-/gi,' ');

    if(tareas.malware){
      strTareas+='Chequeo malware<br>';
    }

    if(tareas.registro){
      strTareas+='Limpieza de registro<br>';
    }

    if(tareas.updates){
      strTareas+='Control de actualizaciones<br>';
    }

    if(tareas.other != ''){
      strOthers = tareas.other;
    } 
    
    mantenimientos.push({
      id:element.payload.doc.id,
      fecha: new Date(element.payload.doc.data().fUnix.seconds*1000),
      computadora: mant.cod,
      nombre: nombre,
      tareas: strTareas,
      other: strOthers

    });
  });
  return mantenimientos;
}