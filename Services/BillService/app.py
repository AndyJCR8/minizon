from flask import Flask, jsonify, request
import mysql.connector
from functools import wraps

app = Flask(__name__)

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
        if not token:
            return jsonify({'mensaje': 'Token de autorización faltante'}), 401

        # Aquí puedes realizar la validación del token
        # por ejemplo, verificar si el token es válido en una base de datos o
        # si coincide con un valor predefinido

        # Si el token no es válido, devuelve una respuesta de error
        # De lo contrario, permite continuar con la solicitud
        # Puedes agregar aquí tu lógica de validación personalizada
        # Por ahora, el siguiente código simplemente permite cualquier token
        return f(*args, **kwargs)

    return decorated

class Cabecera:
    def __init__(self, id, total_quetzales, total_dolares, fecha_emision, id_pedido):
        self.id = id
        self.total_quetzales = total_quetzales
        self.total_dolares = total_dolares
        self.fecha_emision = fecha_emision
        self.id_pedido = id_pedido

# Obtener todas las cabeceras
@app.route('/cabeceras', methods=['GET'])
@verificar_token
def get_all_cabeceras():
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

# Crear una nueva cabecera
@app.route('/cabeceras', methods=['POST'])
@verificar_token
def create_cabecera():
    data = request.get_json()
    total_quetzales = data['TotalQuetzales']
    total_dolares = data['TotalDolares']
    fecha_emision = data['FechaEmision']
    id_pedido = data['IDPedido']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO cabecera (TotalQuetzales, TotalDolares, FechaEmision, IDPedido) VALUES (%s, %s, %s, %s)",
                   (total_quetzales, total_dolares, fecha_emision, id_pedido))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Cabecera creada'})

# Crear un nuevo monto
@app.route('/montos', methods=['POST'])
@verificar_token
def create_monto():
    data = request.get_json()
    monto = data['Monto']
    id_cabecera = data['IDCabecera']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO monto (Monto, IDCabecera) VALUES (%s, %s)",
                   (monto, id_cabecera))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Monto creado'})

# Resto de las rutas...

if __name__ == '__main__':
    app.run(port=5010)
