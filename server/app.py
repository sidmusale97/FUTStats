from flask import Flask, request, jsonify, abort
from PlayerService import PlayerService
app = Flask(__name__)
service = PlayerService()

@app.route("/api/getAllPlayers")
def getAll():
    plist = service.getAllPlayers()
    return jsonify([p.__dict__ for p in plist])

@app.route("/api/player/<int:id>")
def getPlayer(id):
    player = service.getPlayer(id) 
    writePopPlayerToFile()
    if (player == -1):
        abort(404)
    else:
        return jsonify(player.__dict__)

@app.route("/api/price/<int:id>")
def getPrices(id):
    prices = service.getPlayerPrices(id) 
    if (prices == -1):
        abort(404)
    else:
        return jsonify([p.__dict__ for p in prices])

def writePopPlayerToFile():
    with open('popular_players.txt', 'w') as file:
        file.write(str(PlayerService.pop_players_list))

if __name__ == '__main__':
    app.run(debug = True)


