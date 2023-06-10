import mysql.connector
from flask import Flask, jsonify, request
from functools import wraps
from datetime import datetime

app = Flask(__name__)

import os
import sys

# Obtiene la ruta absoluta del directorio actual
current_dir = os.path.dirname(os.path.abspath(__file__))
# Agrega la ruta del directorio actual al sistema de rutas de Python
sys.path.append(current_dir)
from JWT import code

# Configurar la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cobros"
)

def verificar_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Obtén el token de autorización de la cabecera
        if 'Authorization' in request.headers:
            header = request.headers['Authorization']
            if header.startswith('Bearer '):
                # Extrae el token de autorización
                token = header.split(' ')[1]

        # Verifica si el token es válido
        # print(token)
        
        try:
            res = code.verifyToken(token)
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'mensaje': f'Token de autorización invalido: {e}'}), 401

        if not res:
            return jsonify({'mensaje': 'Token de autorización faltante'}), 401
        
        return f(res, *args, **kwargs)

    return decorated

class Cabecera:
    def __init__(self, id, total_quetzales, total_dolares, fecha_emision, id_pedido):
        self.id = id
        self.total_quetzales = total_quetzales
        self.total_dolares = total_dolares
        self.fecha_emision = fecha_emision
        self.id_pedido = id_pedido

# Obtener todas las cabeceras
@app.route('/token', methods=['GET'])
def getToken():
    token = code.generateNewToken({"data": "hola mundo"})
    return jsonify({'Token': token})

# Obtener todas las cabeceras
@app.route('/cabeceras', methods=['GET'])
@verificar_token
def get_all_cabeceras(tokenPayload):
    print(f"tkPayload: {tokenPayload}")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM cabecera")
    result = cursor.fetchall()
    cabeceras = []
    for row in result:
        cabecera = Cabecera(row[0], row[1], row[2], row[3], row[4])
        cabeceras.append(cabecera.__dict__)
    cursor.close()
    return jsonify(cabeceras)

# Obtener una cabecera por su ID
@app.route('/cabeceras/<int:id>', methods=['GET'])
@verificar_token
def get_cabecera_by_id(id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM cabecera WHERE IDFactura = %s", (id,))
    result = cursor.fetchone()
    if result:
        cabecera = Cabecera(result[0], result[1], result[2], result[3], result[4])
        cursor.close()
        return jsonify(cabecera.__dict__)
    else:
        cursor.close()
        return jsonify({'message': 'Cabecera no encontrada'})
    
# Obtener una cabecera ID de pedido
@app.route('/cabecera/pedido/<int:id>', methods=['GET'])
@verificar_token
def get_cabecera_by_id_pedido(token, id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM cabecera WHERE IDPedido = %s", (id,))
    result = cursor.fetchone()
    if result:
        cabecera = Cabecera(result[0], result[1], result[2], result[3], result[4])
        cursor.close()
        return jsonify(cabecera.__dict__)
    else:
        cursor.close()
        return jsonify({'message': 'Cabecera no encontrada'})

# Crear una nueva cabecera
@app.route('/cabeceras', methods=['POST'])
@verificar_token
def create_cabecera(tokenData):
    data = request.get_json()
    """ total_quetzales = data['TotalQuetzales']
    total_dolares = data['TotalDolares']
    fecha_emision = datetime.now().strftime('%Y-%m-%d')
    id_pedido = data['IDPedido'] """
    fecha_emision = datetime.now().strftime('%Y-%m-%d')
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO cabecera (TotalQuetzales, TotalDolares, FechaEmision, IDPedido) VALUES (%s, %s, %s, %s)",
                   (tokenData['TotalQuetzales'], tokenData['TotalDolares'], fecha_emision, tokenData['IDPedido']))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Cabecera creada'})

# Crear un nuevo monto
@app.route('/montos', methods=['POST'])
@verificar_token
def create_monto(tokenData):
    data = request.get_json()
    cantidad = data['CantidadProducto']
    id_factura = data['IDFactura']
    subTotal = data['SubTotalQuetzales']
    id_producto = data['IDProducto']
    
    cursor = db.cursor()
    """ cursor.execute("INSERT INTO monto (CantidadProducto, SubTotalQuetzales, IDProducto, IDFactura) VALUES (%s, %s, %s, %s)",
                   (cantidad, subTotal, id_producto, id_factura)) """
    cursor.execute("CALL agregarMontoACabecera(%s, %s, %s, %s)", (id_producto, subTotal, cantidad, id_factura))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Monto creado'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010)
