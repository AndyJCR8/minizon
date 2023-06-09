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

# Crear un nuevo monto
@app.route('/montos', methods=['POST'])
def create_monto():
    data = request.get_json()
    cantidad_producto = data['CantidadProducto']
    subtotal_quetzales = data['SubTotalQuetzales']
    id_producto = data['IDProducto']
    
    # Obtener el ID de la cabecera
    cabecera_id = create_cabecera()
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO monto (CantidadProducto, SubTotalQuetzales, IDProducto, IDFactura) VALUES (%s, %s, %s, %s)", (cantidad_producto, subtotal_quetzales, id_producto, cabecera_id))
    db.commit()
    monto_id = cursor.lastrowid
    cursor.close()
    
    nuevo_monto = Monto(monto_id, cantidad_producto, subtotal_quetzales, id_producto, cabecera_id)
    return jsonify(nuevo_monto.__dict__)

""" # Crear una nueva cabecera
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
    return jsonify(nueva_cabecera.__dict__)  # Convertir el objeto a un diccionario """

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
    
""" # Crear un nuevo monto
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
 """
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
    app.run(port=5010)
