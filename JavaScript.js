const sql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'tu_servidor',
    database: 'LibreriaLosLectores',
    options: {
        encrypt: true, // Si estás utilizando Azure, puedes necesitar esta opción
        enableArithAbort: true
    }
};

// Función para conectar y ejecutar consultas SQL
async function ejecutarConsultas() {
    try {
        // Conectar a la base de datos
        await sql.connect(config);

        // Insertar datos de prueba en la tabla Clientes
        const resultadoInsertClientes = await sql.query`
            INSERT INTO Clientes (Nombre, Genero)
            VALUES ('Juan Pérez', 'Masculino'),
                   ('Ana Gómez', 'Femenino');
        `;

        console.log('Filas afectadas en Clientes:', resultadoInsertClientes.rowsAffected);

        // Insertar datos de prueba en la tabla Libros
        const resultadoInsertLibros = await sql.query`
            INSERT INTO Libros (Titulo, Tipo, Precio)
            VALUES ('El Quijote', 1, 90.00),
                   ('Cien años de soledad', 2, 100.00);
        `;

        console.log('Filas afectadas en Libros:', resultadoInsertLibros.rowsAffected);

        // Insertar datos de prueba en la tabla Ventas
        const resultadoInsertVentas = await sql.query`
            INSERT INTO Ventas (ClienteID, LibroID, Cantidad, ImporteBruto, Descuento, ImporteNeto)
            VALUES (1, 1, 2, 180.00, 9.00, 171.00),
                   (2, 2, 1, 100.00, 8.00, 92.00);
        `;

        console.log('Filas afectadas en Ventas:', resultadoInsertVentas.rowsAffected);

    } catch (error) {
        console.error('Error al ejecutar consultas:', error.message);
    } finally {
        // Cerrar la conexión
        await sql.close();
    }
}

// Llamar a la función
ejecutarConsultas();

