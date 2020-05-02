class Player:
    def __init__(self,resource_id, name, full_name, overall, club, league, nation, pos):
        self.resource_id = resource_id
        self.name = name
        self.full_name = full_name
        self.overall = overall
        self.club = club
        self.league = league
        self.nation = nation
        self.pos = pos

    

class PlayerPriceInfo():
    def __init__(self, date, ps4, xbox, pc):
        self.date = date
        self.ps4 = ps4
        self.xbox = xbox
        self.pc = pc


class Goalie(Player):
    def __init__(self,resource_id, name, full_name, overall, club, league, nation, pos, div, hand, kick, ref, spd, positioning):
        Player.__init__(self,resource_id, name, full_name, overall, club, league, nation, pos)
        self.k1 = div
        self.k2 = hand
        self.k3 = kick
        self.k4 = ref
        self.k5 = spd
        self.k6 = positioning

class FieldPlayer(Player):
    def __init__(self,resource_id, name, full_name, overall, club, league, nation, pos, pac, dri, sho, pas, defend, phy):
        Player.__init__(self,resource_id, name, full_name, overall, club, league, nation, pos)
        self.k1 = pac
        self.k2 = sho
        self.k3 = pas
        self.k4 = dri
        self.k5 = defend
        self.k6 = phy
    

class Node():
    def __init__(self, name, count):
        self.name = name
        self.count = count
        self.next = None


class PopularPlayerLL():
    def __init__(self):
        self.head = None

    def updateList(self,name):
        # look for name in LL
        ptr = self.head
        while (ptr):
            # if this player has been searched for before update the count
            if (ptr.name == name):
                ptr.count += 1
                return
            ptr = ptr.next
        # if the code reaches here that means this player has not been searched for before
        self.insertNode(name)
    
    # insert node to beginning of LL
    def insertNode(self,name):
        # if head is None then make a new node and make that the head
        if (self.head is None):
            n = Node(name, 1)
            self.head = n
        else:
            # create new node and insert it into beginning of LL
            n = Node(name, 1)
            n.next = self.head
            self.head = n

    def __str__(self):
        ptr = self.head
        string = ''
        while (ptr):
            string +='Player Name: %s \t Times Searched: %d\n' % (ptr.name, ptr.count)
            ptr = ptr.next

        return string