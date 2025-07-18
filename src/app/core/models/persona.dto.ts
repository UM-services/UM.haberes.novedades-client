export interface FacultadDto {
  facultadId: number;
  nombre: string;
  reducido: string;
  server: string;
  backendServer: string;
  backendPort: number;
  dbName: string;
  dsn: string;
}

export interface GeograficaDto {
  geograficaId: number;
  nombre: string;
  reducido: string;
  desarraigo: number;
  geograficaIdReemplazo: number | null;
}

export interface DependenciaDto {
  dependenciaId: number;
  nombre: string;
  acronimo: string;
  facultadId: number;
  geograficaId: number;
  facultad: FacultadDto;
  geografica: GeograficaDto;
}

export interface AfipSituacionDto {
  afipSituacionId: number;
  descripcion: string;
}

export interface PersonaDto {
  legajoId: number;
  documento: number;
  apellido: string;
  nombre: string;
  nacimiento: string;
  altaDocente: string;
  ajusteDocente: number;
  altaAdministrativa: string;
  ajusteAdministrativo: number;
  estadoCivil: string;
  situacionId: number;
  reemplazoDesarraigo: number;
  mitadDesarraigo: number;
  cuil: string;
  posgrado: number;
  estado: number;
  liquida: string;
  estadoAfip: number;
  dependenciaId: number;
  salida: string;
  obraSocial: number;
  actividadAfip: number;
  localidadAfip: number;
  situacionAfip: number;
  modeloContratacionAfip: number;
  directivoEtec: number;
  dependencia: DependenciaDto;
  afipSituacion: AfipSituacionDto;
}
