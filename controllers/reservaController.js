const connection = require("../db/db");

const getAllReservas = (req, res) => {
    const sql = `
        SELECT 
        r.ID,
        r.mail_usuario,
        r.fecha,
        JSON_OBJECT(
            'id_cancha', c.id,
            'Nombre_cancha', c.nombre
        ) AS cancha,
        JSON_OBJECT(
            'Id_turno', t.ID,
            'Nombre_turno', t.nombre,
            'Inicio', t.inicio,
            'Fin', t.fin
        ) AS turno,
        r.estado
        FROM 
            reserva r
        JOIN 
            Turno_Cancha tc ON r.ID_Turno_Cancha = tc.ID
        JOIN 
            canchas c ON tc.ID_cancha = c.ID
        JOIN 
            turnos t ON tc.ID_turno = t.ID;
        `;
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).json(results);
    });
};

const getReservasOrderByDate = (req, res) => {
    const sql = `
        SELECT
    fecha,
    JSON_OBJECTAGG(
        nombre_cancha,
        Reservas_arr
    ) AS Reservas
    FROM (
        SELECT
            r.fecha,
            c.nombre AS nombre_cancha,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'Id_reserva', r.ID,
                    'Estado', r.estado,
                    'mail_usuario', u.mail,
                    'Inicio', t.inicio,
                    'Fin', t.fin
                )
            ) AS Reservas_arr
    FROM
        reserva r
    JOIN
        Turno_Cancha tc ON r.ID_turno_cancha = tc.ID
    JOIN
        canchas c ON tc.ID_cancha = c.ID
    JOIN
        usuario u ON r.mail_usuario = u.mail
    JOIN
        turnos t ON tc.ID_turno = t.ID
    GROUP BY
        r.fecha, c.nombre, r.ID, r.estado, u.mail, t.inicio, t.fin
    ) AS subquery
    GROUP BY
        fecha;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).json(results);
    });
};

const getReservaById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM reserva WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).send("Reserva no encontrada");
            return;
        }
        res.status(200).json(results[0]);
    });
};

const createReserva = (req, res) => {
    const { nombre_cancha, nombre_turno, fecha, estado, mail_usuario } = req.body;

    // Consulta para obtener ID de la Cancha
    let sqlCancha = "SELECT id FROM canchas WHERE nombre = ?";
    connection.query(sqlCancha, [nombre_cancha], (err, resultsCancha) => {
        if (err) {
            console.error("Error al obtener ID de la cancha:", err);
            res.status(500).send("Error al obtener ID de la cancha");
            return;
        }

        // Consulta para obtener ID del Turno
        let sqlTurno = "SELECT ID FROM turnos WHERE nombre = ?";
        connection.query(sqlTurno, [nombre_turno], (err, resultsTurno) => {
            if (err) {
                console.error("Error al obtener ID del turno:", err);
                res.status(500).send("Error al obtener ID del turno");
                return;
            }

            // Consulta para obtener ID de la tabla intermedia Turno_Cancha
            let sqlTurnoCancha = "SELECT ID FROM Turno_Cancha WHERE ID_turno = ? AND ID_cancha = ?";
            connection.query(sqlTurnoCancha, [resultsTurno[0].ID, resultsCancha[0].id], (err, resultsTC) => {
                if (err) {
                    res.status(500).send({message:"Error al obtener ID de Turno_Cancha"});
                    return;
                }

                // Insertar reserva utilizando el ID de Turno_Cancha obtenido
                let sqlReserva = "INSERT INTO reserva (mail_usuario, fecha, ID_turno_cancha, estado) VALUES (?, ?, ?, ?)";
                connection.query(
                    sqlReserva, [mail_usuario, fecha, resultsTC[0].ID, estado], (err, resultsReserva) => {
                        if (err) {
                            res.status(500).send({message:"Error al insertar reserva", err});
                            return;
                        };
                        res.status(201).send({
                            message: `Reserva con id:${resultsReserva.insertId} ha sido agregada`,
                            idReserva: resultsReserva.insertId,
                        });
                    }
                );
            });
        });
    });
};

const updateReserva = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const sql = "UPDATE reserva SET ? WHERE id = ?";
    connection.query(sql, [updates, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(`Cancha con ID: ${id} ha sido actualizada`);
    });
};

const deleteReserva = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM reserva WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({message: `Reserva con ID: ${id} ha sido eliminada`});
    });
};

module.exports = {
    getAllReservas,
    getReservasOrderByDate,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva,
};
