from flask import Flask, jsonify, request
import mysql.connector
import json

app = Flask(__name__)

# Configurar la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cobros"
)

class Monto:
    def __init__(self, id, cantidad_producto, subtotal_quetzales, id_producto, id_factura):
        self.id = id
        self.cantidad_producto = cantidad_producto
        self.subtotal_quetzales = subtotal_quetzales
        self.id_producto = id_producto
        self.id_factura = id_factura

# Obtener todos los montos
@app.route('/montos', methods=['GET'])
def get_all_montos():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM monto")
    result = cursor.fetchall()
    montos = []
    for row in result:
        monto = Monto(row[0], row[1], row[2], row[3], row[4])
        montos.append(monto.__dict__)
    cursor.close()
    return jsonify(montos)

# Obtener un monto por su ID
@app.route('/montos/<int:id>', methods=['GET'])
def get_monto_by_id(id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM monto WHERE IDMonto = %s", (id,))
    result = cursor.fetchone()
    if result:
        monto = Monto(result[0], result[1], result[2], result[3], result[4])
        cursor.close()
        return jsonify(monto.__dict__)
    else:
        cursor.close()
        return jsonify({'message': 'Monto no encontrado'})

# Crear un nuevo monto
@app.route('/montos', methods=['POST'])
def create_monto():
    data = request.get_json()
    cantidad_producto = data['CantidadProducto']
    subtotal_quetzales = data['SubTotalQuetzales']
    id_producto = data['IDProducto']
    id_factura = data['IDFactura']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO monto (CantidadProducto, SubTotalQuetzales, IDProducto, IDFactura) VALUES (%s, %s, %s, %s)", (cantidad_producto, subtotal_quetzales, id_producto, id_factura))
    db.commit()
    monto_id = cursor.lastrowid
    cursor.close()
    
    nuevo_monto = Monto(monto_id, cantidad_producto, subtotal_quetzales, id_producto, id_factura)
    return jsonify(nuevo_monto.__dict__)


# Actualizar un monto por su ID
@app.route('/montos/<int:id>', methods=['PUT'])
def update_monto(id):
    data = request.get_json()
    cantidad_producto = data['CantidadProducto']
    subtotal_quetzales = data['SubTotalQuetzales']
    id_producto = data['IDProducto']
    id_factura = data['IDFactura']
    
    cursor = db.cursor()
    cursor.execute("UPDATE monto SET CantidadProducto = %s, SubTotalQuetzales = %s, IDProducto = %s, IDFactura = %s WHERE IDMonto = %s", (cantidad_producto, subtotal_quetzales, id_producto, id_factura, id))
    db.commit()
    
    if cursor.rowcount > 0:
        monto_actualizado = Monto(id, cantidad_producto, subtotal_quetzales, id_producto, id_factura)
        cursor.close()
        return jsonify(monto_actualizado.__dict__)
    else:
        cursor.close()
        return jsonify({'message': 'Monto no encontrado'})

# Eliminar un monto por su ID
@app.route('/montos/<int:id>', methods=['DELETE'])
def delete_monto(id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM monto WHERE IDMonto = %s", (id,))
    db.commit()
    
    if cursor.rowcount > 0:
        cursor.close()
        return jsonify({'message': 'Monto eliminado correctamente'})
    else:
        cursor.close()
        return jsonify({'message': 'Monto no encontrado'})

if __name__ == '__main__':
    app.run(port=5011)
