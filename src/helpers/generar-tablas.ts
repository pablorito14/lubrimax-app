import { formatoDDMMMYYYY } from '../helpers/formatos-fecha';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

export const listadoMantenimientos = (data:any,filter?:string) => {
  var mantenimientos:any = [];
  
  data.forEach((element:any) => {
    
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
      // fecha : new Date(mant.fecha.anio,(mant.fecha.mes),(mant.fecha.dia)),
      id:element.payload.doc.id,
      fecha2 : new Date(),
      fecha : formatoDDMMMYYYY(mant.fecha.dia,mant.fecha.mes,mant.fecha.anio),
      computadora: mant.cod,
      nombre: nombre,
      tareas: strTareas,
      other: strOthers
    });
  });
  return mantenimientos;
}