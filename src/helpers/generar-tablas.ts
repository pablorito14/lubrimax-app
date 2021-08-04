import { formatoDDMMMYYYY } from '../helpers/formatos-fecha';

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
      fecha : formatoDDMMMYYYY(mant.fecha.dia,mant.fecha.mes,mant.fecha.anio),
      computadora: mant.cod,
      tareas: strTareas,
      other: strOthers
    });


    
  });

  return mantenimientos;
}