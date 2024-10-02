
const Querys = {
    getTipoUser: 
        "select "+
        "identificacion, "+
        "tipo "+
        "from "+
        "Portal_Usuarios "+
        "where "+
        "identificacion = @identificacion",
    getAllDataStudents: 
        "SELECT "+
        "a.alu1Matricula AS MATRICULA, "+
        "alu1Nombres AS NOMBRE, "+
        "alu1Apellidos AS APELLIDOS, "+
        "alu1Residencia AS RESIDENCIA, "+
        "alu1FechaNac AS [FECHA_NACIMIENTO], "+
        "alu1Sexo AS SEXO, "+
        "[EDAD]= DATEDIFF(YEAR,alu1FechaNac,GETDATE())-(CASE WHEN DATEADD(YY,DATEDIFF(YEAR,alu1FechaNac,GETDATE()), alu1FechaNac)>GETDATE() THEN 1 ELSE 0 END), "+
        "alu1NumTel AS [TEL_FIJO], "+
        "alu1NumMovil AS CELULAR, "+
        "alu1CorreoE AS [CORREO_PERSONAL], "+
        "alu1CorreoInstitucional AS [CORREO_INSTITUCIONAL], "+
        "isnull(alu1Pais, '') AS PAIS, "+
        "isnull(alu1Estado, '') AS ESTADO, "+
        "isnull(alu1Ciudad, '') AS CIUDAD, "+
        "alu1Direccionc AS [DIRECCION], "+
        "alu1CodigoP AS CP, "+
        "b.CURP AS CURP, "+
        "[NIVEL_EDUCATIVO]= CASE WHEN LE.LeFacultad= 'NIVEL MEDIO' THEN LE.LeFacultad WHEN LE.LeFacultad= 'POSTGRADO' THEN 'MAESTRIA' ELSE 'UNIVERSITARIO'END, "+
        "LE.Campus[CAMPO], "+
        "LE.LeNombreEscuelaOficial, "+
        "CURSO_ESCOLAR =(select CicloEscolarActual from DatosCE where Campus= 'ULV') "+
        "FROM Alu1datospersonales a "+
        "INNER JOIN Alu2datossecundarios b ON a.alu1Matricula = b.alu1Matricula "+
        "INNER JOIN ListadoEscuelas LE ON a.leClaveEscuela = LE.LeClaveEscuela "+        
        "WHERE (a.alu1Matricula = @idOrEmail) OR (a.alu1CorreoInstitucional = @idOrEmail)",
    getAllDataTutor: 
        "SELECT "+
        "alu3NombresTutor AS NOMBRE_TUTOR, "+
        "alu3ApellidosTutor AS APELLIDOS_TUTOR, "+
        "alu3TelefonoTutor AS TELETONO_TUTOR, "+
        "alu3DireccionTutor AS DIRECCION_TUTOR, "+
        "isnull(alu3PaisTutor, '') AS PAIS_TUTOR,"+
        "isnull(alu3EstadoTutor, '') AS ESTADO_TUTOR, "+
        "isnull(alu3CiudadTutor, '') AS CIUDAD_TUTOR, "+
        "alu3CodigoPostalTutor AS CP_TUTOR, "+
        "alu3NumMovilTutor AS MOVIL_TUTOR, "+
        "alu3EmailTutor AS EMAIL_TUTOR "+
        "FROM Alu3datosfamiliares "+
        "WHERE alu1Matricula = @matricula",
    getDataWorkStudent: 
        "select "+
        "[ID DEPTO] = dep.idDepartamento, "+
        "[DEPARTAMENTO] = Dep.DepDepartamento, "+
        "[ID JEFE] = FHDP.EmpMatricula, "+
        "[JEFE DEPARTAMENTO] = FHDP.EmpNombre + ' ' + FHDP.EmpApellidos "+
        "FROM "+
        "vidaUtil_AlumnoPorDepartamento VUAD "+
        "INNER JOIN Departamentos Dep on VUAD.idDepartamento = Dep.IdDepartamento "+
        "INNER JOIN FactorHumano_DatosPersonales FHDP on FHDP.EmpMatricula = Dep.EmpMatricula "+
        "WHERE "+
        "cicloEscolar = @ciclo and "+
        "alu1Matricula = @matricula ",
    getDataEmplpyee:
        "SELECT "+
        "[MATRICULA] = FHDP.empMatricula, "+
        "[CAMPUS] = FHDP.campus, "+
        "[NOMBRES] = FHDP.EmpNombre, "+
        "[APELLIDOS] = FHDP.EmpApellidos, "+
        "[FECHA_NACIMIENTO] = FHDP.EmpFechaNacimiento, "+
        "[EDAD]= DATEDIFF(YEAR,FHDP.EmpFechaNacimiento,GETDATE())-(CASE WHEN DATEADD(YY,DATEDIFF(YEAR,FHDP.EmpFechaNacimiento,GETDATE()),FHDP.EmpFechaNacimiento)>GETDATE() THEN 1 ELSE 0 END), "+
        "[SEXO] = FHDP.EmpSexo, "+
        "[CELULAR] = FHDP.EmpTeléfonoMóvil, "+
        "[EMAIl_INSTITUCIONAL] = FHDP.EmpCorreoInstitucional, "+
        "[ID_DEPARATAMENTO] = FHDL.departamento, "+
        "[DEPARTAMENTO] = DEP.DepDepartamento "+
        "FROM FactorHumano_DatosPersonales FHDP "+
        "INNER JOIN FactorHumano_DatosLaborales FHDL on FHDP.EmpMatricula = FHDL.EmpMatricula "+
        "INNER JOIN Departamentos DEP on DEP.IdDepartamento = FHDL.departamento "+
        "WHERE FHDL.empMatricula = @empMatricula",
    getBossBedroom:
        "SELECT DISTINCT "+
        "[ID DEPTO] = dep.idDepartamento, "+
        "[DEPARTAMENTO] = Dep.DepDepartamento, "+ 
        "[ID JEFE] = FHDP.EmpMatricula, "+
        "[JEFE DEPARTAMENTO] = FHDP.EmpNombre + ' ' + FHDP.EmpApellidos "+ 
        "FROM "+
        "vidaUtil_AlumnoPorDepartamento VUAD "+
        "INNER JOIN Departamentos Dep on VUAD.idDepartamento = Dep.IdDepartamento "+
        "INNER JOIN FactorHumano_DatosPersonales FHDP on FHDP.EmpMatricula = Dep.EmpMatricula "+
        "WHERE "+
        "dep.idDepartamento = @idDepto",
    getBossDepartament:
        'SELECT EmpMatricula FROM Departamentos WHERE EmpMatricula = @EmpMatricula',
    getBossVigilancia:
        'SELECT * FROM Departamentos WHERE EmpMatricula = @EmpMatricula AND IdDepartamento = 302' 
}
module.exports = {
    Querys
}