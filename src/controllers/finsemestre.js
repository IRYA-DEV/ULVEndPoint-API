const { getConnection, sql } = require("../database/connection");
const { Querys } = require("../queries/finsemestre");

const getEncargadoDepto = async (req, res) => {
    let pool
    try {
        console.log(req.params.IdDepto)
        pool = await getConnection();
        const respuesta = await pool
            .request()
            .input('IdDepto', sql.Int, req.params.IdDepto)
            .query(Querys.getBossDepto)
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

const getCoordinador = async (req, res) => {
  let pool
  try {
      console.log(req.params.Matricula)
      pool = await getConnection();
      const respuesta = await pool
          .request()
          .input('Matricula', sql.VarChar, req.params.Matricula)
          .query(Querys.getMatriculaCordi)
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

module.exports = {
  getEncargadoDepto, getCoordinador
}