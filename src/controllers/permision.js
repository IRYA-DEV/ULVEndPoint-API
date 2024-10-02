const { getConnection, sql } = require("../database/connection");
const { Querys } = require("../queries/permison");

const getDatosAlumnoByIdOrEmail = async (req, res) => {
    try {
        const pool = await getConnection();
        const identificacion = await pool
        request()
            .input("identificacion", req.params.idOrEmail)
            .query(Querys.getTipoUser)


            
    } catch (error) {
      console.error('Error en el servidor:', error);  // Depuración
      res.status(500).send(error.message);
    } finally {
      // Cierra la conexión a la base de datos
      if (pool) {
        try {
          await pool.close();
        } catch (closeError) {
          console.error('Error al cerrar la conexión a la base de datos:', closeError);
        }
      }
    }
}
