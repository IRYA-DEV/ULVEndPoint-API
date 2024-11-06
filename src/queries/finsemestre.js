const Querys = {
    getBossDepto: 
    "SELECT * FROM Departamentos WHERE  IdDepartamento = @IdDepto",
    getMatriculaCordi: 
    "SELECT LE.empMatricula, D.IdDepartamento "+
    "FROM Alu1datospersonales a "+
    "INNER JOIN Alu2datossecundarios b ON a.alu1Matricula = b.alu1Matricula "+
    "INNER JOIN ListadoEscuelas LE ON a.leClaveEscuela = LE.LeClaveEscuela "+
    "INNER JOIN Departamentos d ON LE.empMatricula = d.EmpMatricula "+
    "WHERE a.alu1Matricula = @Matricula;"

}
module.exports = {
    Querys
}