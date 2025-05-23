from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import json
import os

app = Flask(__name__)
CORS(app)

symbols_path = "symbols.json" #Caminho para o arquivo JSON

# Verifica se o arquivo JSON existe
if not os.path.exists(symbols_path): 
    
    # Se não existir, cria um novo arquivo JSON com uma lista vazia
    with open(symbols_path, 'w') as f:
        json.dump({"symbols": []}, f)

@app.route('/save_symbol', methods=['POST']) # Rota para salvar a imagem
def save_symbol():
    data = request.get_json() # Recebe os dados do frontend
    image = data['image'].split(',')[1] # Remove o prefixo "data:image/png;base64,"
    char = data['char'] # Caractere associado à imagem
    contexto = data['contexto'] # Contexto associado à imagem
    
    # Salvar no JSON
    with open(symbols_path, 'r') as f:
        content = json.load(f)
        content['symbols'].append({
            "image": image,
            "char": char,
            "contexto": contexto 
        })

    with open(symbols_path, 'w') as f: # Atualiza o arquivo JSON
        json.dump(content, f, indent=2)

    return jsonify({"mensagem": f"Símbolo salvo com caractere '{char}'!"})


@app.route('/check_symbols', methods=['POST'])
def check_symbol():
    data = request.get_json()
    char = data.get('char')
    contexto = data.get('contexto')
    
    with open(symbols_path, "r") as f:
        content = json.load(f)
        for symbol in content['symbols']:
            if symbol['char'] == char and symbol['contexto'] == contexto:
                return jsonify({
                    "exists": True,
                    "existingChar": char,
                    "existingContexto": contexto
                })
    return jsonify({"exists": False})


@app.route('/symbols', methods=['GET']) # Rota para listar os símbolos
def listar_simbolos(): # Listar os símbolos
    with open(symbols_path, "r") as f:
        data = json.load(f)
    return jsonify(data)


if __name__ == "__main__": # Executa o servidor Flask
    app.run(debug=True)