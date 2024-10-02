const { getConnection, sql } = require("../database/connection");
const { Querys } = require("../queries/datos");

const getDatosAlumnoByIdOrEmail = async (req, res) => {
    let pool;
    try {
        const pool = await getConnection();
        const identificacion = await pool
            .request()
            .input("identificacion", req.params.idOrEmail)
            .query(Querys.getTipoUser)
        if (identificacion.recordset[0].tipo == "ALUMNO") {
            const result_student = await pool
                .request()
                .input("idOrEmail", req.params.idOrEmail)
                .query(Querys.getAllDataStudents)

            const result_tutor = await pool
                .request()
                .input("matricula", result_student.recordset[0].MATRICULA)
                .query(Querys.getAllDataTutor)

            const result_work = await pool
                .request()
                .input("matricula", result_student.recordset[0].MATRICULA)
                .input("ciclo", '2024-2025B')
                .query(Querys.getDataWorkStudent)

            data = {
                "Data":
                {
                    "student": result_student.recordset,
                    "type": identificacion.recordset[0].tipo,
                    "Tutor": result_tutor.recordset,
                    "work": result_work.recordset,
                }

            }
        } else if (identificacion.recordset[0].tipo == "EMPLEADO") {
            const result_emplyee = await pool
                .request()
                .input("empMatricula", req.params.idOrEmail)
                .query(Querys.getDataEmplpyee)

            data = {
                "data": {
                    "employee": result_emplyee.recordset,
                    "type": identificacion.recordset[0].tipo,
                }
            }
        }

        console.log(data);
        res.json(data)
    } catch (error) {
        res.status(500).json({error: 'Error al conectar con el servico y devolver una respuesta'})
        console.log(error);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
}

const getIdPreceptor = async (req, res) => {
    let pool
    try {
        const pool = await getConnection();
        console.log(req.params.idDepto);
         
        const datapreceptor = await pool
            .request()
            .input('idDepto', sql.VarChar, req.params.idDepto)
            .query(Querys.getBossBedroom)
            return res.json(datapreceptor.recordset[0]);
    } catch (error) {
        res.status(500).json({error: 'Error al buscar un dato no validos'})
        console.log(error);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
}

const getJefeDepartamento = async (req, res) => {
    let pool
    try {
        console.log(req.params.IdEmpleado)
        pool = await getConnection();
        const respuesta = await pool
            .request()
            .input('EmpMatricula', sql.Int, req.params.IdEmpleado)
            .query(Querys.getBossDepartament)
        console.log(respuesta)
        if (respuesta.recordset.length === 0) {
            return res.json(null); // En caso de que un empleado no sea jefe devuelve nulo
        }
        return res.json(respuesta.recordset[0]);
    } catch (error) {
        res.status(500).json({error: 'Error al buscar un dato no validos'})
        console.log(error);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (error) {
                console.error('Error al cerrar la conexion a la base de datos', closeError);
            }
        }
    }
}

const getJefeVigilancia = async (req, res) => {
    let pool
    try {
        pool = await getConnection();
        const respuesta = await pool
            .request()
            .input('EmpMatricula', sql.Int, req.params.IdEmpleado)
            .query(Querys.getBossVigilancia)
        if (respuesta.recordset.length === 0) {
            return res.json(null); // En caso de que un empleado no sea jefe devuelve nulo
        }
        return res.json(respuesta.recordset[0]);
    } catch (error) {
        res.status(500).json({error: 'Error: dato no validos'})
        console.log(error);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (error) {
                console.error('Error al cerrar la conexion a la base de datos', closeError);
            }
        }
    }
}

module.exports = {
    getDatosAlumnoByIdOrEmail, getIdPreceptor, getJefeDepartamento, getJefeVigilancia
}