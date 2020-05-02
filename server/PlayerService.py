import pandas as pd
from classes import Player, PlayerPriceInfo, FieldPlayer, Goalie, PopularPlayerLL


class PlayerService:

    pop_players_list = PopularPlayerLL()

    def __init__(self):
        #Data Preprocessing
        players = pd.read_csv('./fifa-20-ultimate-team-players-dataset/fixed_fut_bin20_players.csv')
        self.player_prices = pd.read_csv('./fifa-20-ultimate-team-players-dataset/fut_bin20_prices.csv')
        unimportant_cols = list(players.columns[63:])
        unimportant_cols.remove('resource_id')


        self.players = players.drop(unimportant_cols, axis=1)

    def getAllPlayers(self):
        playersList = []
        for _,player in self.players.iterrows():
            p = self.series2player(player.astype('str'))
            playersList.append(p)
        return playersList

    def getPlayer(self,id):
        player = self.players[self.players['resource_id'] == id]
        if (len(player) == 0):
            return -1
        player = player.iloc[0]
        p = self.series2player(player.astype('str'))

        # update popular players dictionary
        PlayerService.pop_players_list.updateList(p.full_name)
        return p

    def series2player(self, player):

        # get all player stats
        pos = player['position']
        resource_id = player['resource_id']
        name = player['player_name']
        full_name = player['player_extended_name']
        overall = player['overall']
        club = player['club']
        league = player['league']
        nation = player['nationality']
        p = None
        if (pos == 'GK'):
            div = player['gk_diving']
            ref = player['gk_reflexes']
            hand = player['gk_handling']
            spd = player['gk_speed']
            kick = player['gk_kicking']
            positioning = player['gk_positoning']
            p = Goalie(resource_id, name, full_name, overall, club, league, nation, pos, div, hand, kick, ref, spd, positioning)
        else:
            pac = player['pace']
            sho = player['shooting']
            pas = player['passing']
            dri = player['dribbling']
            defend = player['defending']
            phy = player['physicality']
            p = FieldPlayer(resource_id,name, full_name, overall, club, league, nation, pos, pac, sho, pas, dri, defend, phy)
        return p

    def series2price(self, price):
        date = price['date']
        ps4 = price['ps4']
        xbox = price['xbox']
        pc = price['pc']
        p = PlayerPriceInfo(date, ps4, xbox, pc)
        return p

    def getPlayerPrices(self,rid):
        prices = self.player_prices[self.player_prices['resource_id'] == rid]
        
        if(prices.empty):
            return -1
            
        priceList = []
        for price in prices.iterrows():
            price = price[1].astype('str')
            p = self.series2price(price)
            priceList.append(p)
        return priceList
    






    