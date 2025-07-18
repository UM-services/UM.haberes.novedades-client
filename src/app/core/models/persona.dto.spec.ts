import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PersonaDto } from './persona.dto';

describe('PersonaDto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
  });

  it('should allow creation of a valid PersonaDto object', () => {
    const persona: PersonaDto = {
      legajoId: 1,
      documento: 12345678,
      apellido: 'Pérez',
      nombre: 'Juan',
      nacimiento: '1990-01-01',
      altaDocente: '2020-01-01',
      ajusteDocente: 0,
      altaAdministrativa: '2020-01-01',
      ajusteAdministrativo: 0,
      estadoCivil: 'Soltero',
      situacionId: 1,
      reemplazoDesarraigo: 0,
      mitadDesarraigo: 0,
      cuil: '20-12345678-9',
      posgrado: 0,
      estado: 1,
      liquida: 'S',
      estadoAfip: 1,
      dependenciaId: 1,
      salida: '',
      obraSocial: 1,
      actividadAfip: 1,
      localidadAfip: 1,
      situacionAfip: 1,
      modeloContratacionAfip: 1,
      directivoEtec: 0,
      dependencia: {
        dependenciaId: 1,
        nombre: 'Depto',
        acronimo: 'DPT',
        facultadId: 1,
        geograficaId: 1,
        facultad: {
          facultadId: 1,
          nombre: 'Facultad',
          reducido: 'F',
          server: '',
          backendServer: '',
          backendPort: 0,
          dbName: '',
          dsn: ''
        },
        geografica: {
          geograficaId: 1,
          nombre: 'Geo',
          reducido: 'G',
          desarraigo: 0,
          geograficaIdReemplazo: null
        }
      },
      afipSituacion: {
        afipSituacionId: 1,
        descripcion: 'Situación'
      }
    };
    expect(persona.nombre).toBe('Juan');
    expect(persona.dependencia.facultad.nombre).toBe('Facultad');
  });
});
