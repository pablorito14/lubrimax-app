export interface Mantenimiento {
  cod?:string;
  fUnix?:Date;
  accion: {
    archivos?:boolean,
    malware?:boolean,
    registro?:boolean,
    updates?:boolean,
    other?:string
  }
}
