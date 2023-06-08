from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

# Configurar la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cobros"
)

class Cabecera:
    def __init__(self, id, total_quetzales, total_dolares, fecha_emision, id_pedido):
        self.id = id
        self.total_quetzales = total_quetzales
        self.total_dolares = total_dolares
        self.fecha_emision = fecha_emision
        self.id_pedido = id_pedido

# Obtener todas las cabeceras
@app.route('/cabeceras', methods=['GET'])
def get_all_cabeceras():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM cabecera")
    result = cursor.fetchall()
    cabeceras = []
    for row in result:
        cabecera = Cabecera(row[0], row[1], row[2], row[3], row[4])
        cabeceras.append(cabecera.__dict__)  # Convertir el objeto a un diccionario
    cursor.close()
    return jsonify(cabeceras)

# Obtener una cabecera por su ID
@app.route('/cabeceras/<int:id>', methods=['GET'])
def get_cabecera_by_id(id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM cabecera WHERE IDFactura = %s", (id,))
    result = cursor.fetchone()
    if result:
        cabecera = Cabecera(result[0], result[1], result[2], result[3], result[4])
        cursor.close()
        return jsonify(cabecera.__dict__)  # Convertir el objeto a un diccionario
    else:
        cursor.close()
        return jsonify({'message': 'Cabecera no encontrada'})

# Crear una nueva cabecera
@app.route('/cabeceras', methods=['POST'])
def create_cabecera():
    data = request.get_json()
    total_quetzales = data['TotalQuetzales']
    total_dolares = data['TotalDolares']
    fecha_emision = data['FechaEmision']
    id_pedido = data['IDPedido']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO cabecera (TotalQuetzales, TotalDolares, FechaEmision, IDPedido) VALUES (%s, %s, %s, %s)", (total_quetzales, total_dolares, fecha_emision, id_pedido))
    db.commit()
    cabecera_id = cursor.lastrowid
    cursor.close()
    
    nueva_cabecera = Cabecera(cabecera_id, total_quetzales, total_dolares, fecha_emision, id_pedido)
    return jsonify(nueva_cabecera.__dict__)  # Convertir el objeto a un diccionario

# Actualizar una cabecera por su ID
@app.route('/cabeceras/<int:id>', methods=['PUT'])
def update_cabecera(id):
    data = request.get_json()
    total_quetzales = data['TotalQuetzales']
    total_dolares = data['TotalDolares']
    fecha_emision = data['FechaEmision']
    id_pedido = data['IDPedido']
    
    cursor = db.cursor()
    cursor.execute("UPDATE cabecera SET TotalQuetzales = %s, TotalDolares = %s, FechaEmision = %s, IDPedido = %s WHERE IDFactura = %s", (total_quetzales, total_dolares, fecha_emision, id_pedido, id))
    db.commit()
    
    if cursor.rowcount > 0:
        cabecera_actualizada = Cabecera(id, total_quetzales, total_dolares, fecha_emision, id_pedido)
        cursor.close()
        return jsonify(cabecera_actualizada.__dict__)  # Convertir el objeto a un diccionario
    else:
        cursor.close()
        return jsonify({'message': 'Cabecera no encontrada'})

# Eliminar una cabecera por su ID
@app.route('/cabeceras/<int:id>', methods=['DELETE'])
def delete_cabecera(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM cabecera WHERE IDFactura = %s", (id,))
    db.commit()
    
    if cursor.rowcount > 0:
        cursor.close()
        return jsonify({'message': 'Cabecera eliminada correctamente'})
    else:
        cursor.close()
        return jsonify({'message': 'Cabecera no encontrada'})

if __name__ == '__main__':
    app.run(port=5010)
