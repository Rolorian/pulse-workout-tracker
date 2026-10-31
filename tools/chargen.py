# Character generator in the Pulse "chunky earthy" style (original designs).
# Region letters in templates: O outline, H hair, F face, f face shade, E eye, C cloth, D cloth dark,
# X accent, A sleeve, N hand, T belt, L legs, B boots, R robe hem (long clothing), G gold trim
from PIL import Image
K=(30,23,18)
def rgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def shade(c,f): return tuple(max(0,min(255,int(v*f))) for v in c)
FRONT=[
"................",
".....OOOOOO.....",
"....OHHHHHHO....",
"...OHHHHHHHHO...",
"...OHFFFFFFHO...",
"...OFFEFFEFFO...",
"...OFFFffFFFO...",
"....OfFFFFfO....",
"..OOCCCCCCCCOO..",
".OACCCXXXXCCCAO.",
".OACCCXXXXCCCAO.",
".ONOCCXXXXCCONO.",
".ONOTTTTTTTTONO.",
"..OOLLLLLLLLOO..",
"...OBBO..OBBO...",
"...OOO....OOO...",
]
BACK=[
"................",
".....OOOOOO.....",
"....OHHHHHHO....",
"...OHHHHHHHHO...",
"...OHHHHHHHHO...",
"...OHHHHHHHHO...",
"...OHHHHHHHHO...",
"....OfHHHHfO....",
"..OOCCCCCCCCOO..",
".OACCCCCCCCCCAO.",
".OACCCDDDDCCCAO.",
".ONOCCDDDDCCONO.",
".ONOTTTTTTTTONO.",
"..OOLLLLLLLLOO..",
"...OBBO..OBBO...",
"...OOO....OOO...",
]
SIDE=[  # facing right
"................",
"......OOOOO.....",
".....OHHHHHO....",
"....OHHHHHHHO...",
"....OHHHFFFFO...",
"....OHHFFFEFO...",
"....OHFFFFFfO...",
".....OfFFFFO....",
".....OCCCCCO....",
"....OCCCCXXO....",
"....OCAACXXO....",
"....OCANCXXO....",
"....OTTNTTTO....",
".....OLLLLO.....",
".....OBOOBO.....",
".....OO..OO.....",
]
def g(t): return [list(r) for r in t]
def legs_front(grid,ph):
    # ph 0 stand, 1 left step, 2 stand, 3 right step
    if ph==1: grid[14]=list("...OBBO..OLLO..."); grid[15]=list("...OOO....OBO...")
    if ph==3: grid[14]=list("...OLLO..OBBO..."); grid[15]=list("....OBO...OOO...")
def arms_front(grid,ph):
    if ph==1: grid[12][1:4]=list("OAO"); grid[11][12:15]=list("ONO"); grid[12][12:15]=list("ONO"); grid[10][1:4]=list("OAO"); grid[11][1:4]=list("ONO")
    if ph==3: grid[12][12:15]=list("OAO"); grid[10][12:15]=list("OAO"); grid[11][12:15]=list("ONO")
def legs_side(grid,ph):
    if ph in (1,3): grid[13]=list("....OLLOLLO....."); grid[14]=list("...OBO..OBO....."); grid[15]=list("...OO....OO.....")
    if ph==3: grid[10][6:8]=list("CC"); grid[11][6:8]=list("CC"); grid[11][9]='N'
def build(dirn,ph,cfg,attack=False):
    t=g({'down':FRONT,'up':BACK,'right':SIDE,'left':SIDE}[dirn])
    if dirn in ('down','up'): legs_front(t,ph); arms_front(t,ph)
    else: legs_side(t,ph)
    hair=cfg.get('hair','short')
    # hair styles (front/back/side tweaks)
    if hair=='bald':
        for y in range(2,4):
            for x in range(16):
                if t[y][x]=='H': t[y][x]='F'
        if dirn=='up':
            for y in range(4,7):
                for x in range(16):
                    if t[y][x]=='H': t[y][x]='F'
    if hair=='long' and dirn=='down':
        for y in (5,6,7): t[y][3]='H' if t[y][3]=='O' else t[y][3]; 
        t[7][4]='H'; t[7][11]='H'
    if hair in ('hood','helmet','scarf') and dirn=='down':
        t[4][4]='H'; t[4][11]='H'
    if cfg.get('beard') and dirn=='down':
        t[6]=list("...OFwwwwwwFO..."); t[7]=list("....OwwwwwwO....") ; t[8][6:10]=list("wwww")
    if cfg.get('beard') and dirn in('left','right'):
        t[6][9:12]=list("www"); t[7][8:11]=list("www")
    if cfg.get('robe'):
        if dirn in ('down','up'):
            t[12]=list(".ONOCCCCCCCCONO."); t[13]=list("..OCCCCCCCCCCO.."); t[14]=list("..ODDDDDDDDDDO.."); t[15]=list("...OOOOOOOOOO...")
        else:
            t[13]=list(".....OCCCCO....."); t[14]=list(".....ODDDDO....."); t[15]=list(".....OOOOOO.....")
    if cfg.get('skirt') and dirn in ('down','up'):
        t[13]=list("..OCCCCCCCCCCO.."); 
    if attack:
        if dirn=='down': t[11][12:16]=list("ONNO"); t[12][13:16]=list("OO."); t[10][13:16]=list("AAO")
        elif dirn=='up': t[9][13:16]=list("AO."); t[8][13:15]=list("NO")
        else: t[10]=list("....OCCCCAANO..."); t[11]=list("....OCCCCXXO....")
    if dirn=='left': t=[r[::-1] for r in t]
    return t
def colorize(t,cfg):
    sk=rgb(cfg.get('skin','#ce986c')); hair=rgb(cfg.get('haircol','#5c3a22')); cl=rgb(cfg['cloth']); acc=rgb(cfg.get('accent',cfg['cloth']))
    leg=rgb(cfg.get('legs','#5a4632')); boot=rgb(cfg.get('boots','#3e2a18')); belt=rgb(cfg.get('belt','#6e4a24'))
    sleeve=rgb(cfg['sleeve']) if 'sleeve' in cfg else cl
    eye=rgb(cfg.get('eye','#1a1410'))
    m={'O':K,'H':hair,'F':sk,'f':shade(sk,0.78),'E':eye,'C':cl,'D':shade(cl,0.72),'X':acc,'A':sleeve,'N':sk if not cfg.get('gloves') else rgb(cfg['gloves']),'T':belt,'L':leg,'B':boot,'w':rgb(cfg.get('beardcol','#e8e0d0')),'.':None}
    im=Image.new('RGBA',(16,16),(0,0,0,0))
    for y,r in enumerate(t):
        for x,ch in enumerate(r):
            c=m.get(ch)
            if c: im.putpixel((x,y),c+(255,))
    # top-left light: brighten the first lit pixel of each run of cloth/hair, darken the right edge
    px=im.load()
    for y in range(16):
        for x in range(15,0,-1):
            if px[x,y][3] and px[x,y][:3]!=K and (x+1>15 or px[x+1,y][:3]==K):
                c=px[x,y]; px[x,y]=shade(c[:3],0.82)+(255,)
    for y in range(16):
        for x in range(1,16):
            if px[x,y][3] and px[x,y][:3]!=K and px[x-1,y][:3]==K and px[x,y][:3] in (hair,cl,sleeve):
                c=px[x,y]; px[x,y]=shade(c[:3],1.16)+(255,)
    return im
def extras(im,dirn,cfg,ph,attack):
    px=im.load()
    def P(x,y,c):
        if 0<=x<16 and 0<=y<16: px[x,y]=rgb(c)+(255,)
    if cfg.get('staff'):
        x=13 if dirn!='left' else 2
        if dirn in('down','left','right'):
            for y in range(4,15): P(x,y,'#6e4a24')
            for y in range(4,15): P(x+1 if dirn!='left' else x-1,y,'#1e1712')
            P(x,3,'#d4aa30'); P(x,2,'#1e1712')
    if cfg.get('helmet') and dirn!='up':
        for x in range(4,12): P(x,2,'#a0a6aa'); P(x,3,'#70767c')
        P(5,2,'#d0d6da')
    if cfg.get('ears'):
        if dirn=='down': P(2,4,'#3e5a2a'); P(1,3,'#1e1712'); P(2,3,'#58843f'); P(13,4,'#3e5a2a'); P(14,3,'#1e1712'); P(13,3,'#58843f')
        elif dirn in('left','right'):
            x=5 if dirn=='right' else 10; P(x,3,'#58843f'); P(x-1 if dirn=='right' else x+1,2,'#1e1712')
    if cfg.get('shield') and dirn in ('down','right','left'):
        if dirn=='down':
            for y in range(9,13):
                for x in range(0,3): P(x,y,'#8a5a2c')
            P(1,10,'#d4aa30'); 
            for y in range(9,13): P(0,y,'#1e1712')
    if cfg.get('bones') and dirn!='up':
        for x in range(5,11):
            if dirn in('down',) or 5<=x<=9: P(x,10,'#8a8478'); P(x,12 if dirn!='down' else 11,'#8a8478')
        if dirn=='down': P(7,9,'#8a8478'); P(8,9,'#8a8478'); P(7,13,'#8a8478'); P(8,13,'#8a8478')
        if dirn=='down': P(6,6,'#5a5448'); P(9,6,'#5a5448'); P(7,7,'#1a1410'); P(8,7,'#1a1410')
    return im
def sheet(cfg):
    S=Image.new('RGBA',(64,112),(0,0,0,0))
    dirs=['down','up','left','right']
    for col,d in enumerate(dirs):
        for row in range(4):
            ph=row
            im=colorize(build(d,ph,cfg),cfg); im=extras(im,d,cfg,ph,False)
            bob = -1 if ph in (1,3) else 0
            S.alpha_composite(im,(col*16,row*16+ (bob if bob>0 else 0)))
        # row 4: attack
        im=colorize(build(d,0,cfg,attack=True),cfg); im=extras(im,d,cfg,0,True); S.alpha_composite(im,(col*16,64))
        # row 5: jump (raised)
        im=colorize(build(d,0,cfg),cfg); im=extras(im,d,cfg,0,False); S.alpha_composite(im.crop((0,0,16,15)),(col*16,80))
    # row 6: col0 knocked down (tilted), col1 victory (arms up), col2/3 copies
    down=colorize(build('right',0,cfg),cfg).rotate(90,expand=False); S.alpha_composite(down,(0,96+3) if False else (0,96))
    v=g(FRONT); v[8][1:3]=list('ON'); v[8][13:15]=list('NO'); v[9][0:2]=list('.O'); 
    vt=build('down',0,cfg); vt[9]=list(".OACCCXXXXCCCAO."); vt[7][1:3]=list('ON'); vt[7][13:15]=list('NO'); vt[8][1:3]=list('OA'); vt[8][13:15]=list('AO'); vt[11][1:4]=list('.OO'); vt[11][12:15]=list('OO.'); vt[12][1:4]=list('.OT'); vt[12][12:15]=list('TO.')
    vim=colorize(vt,cfg); vim=extras(vim,'down',cfg,0,False)
    S.alpha_composite(vim,(16,96)); S.alpha_composite(vim,(32,96)); S.alpha_composite(vim,(48,96))
    return S
def portrait(cfg):
    # 38x38 bust: the front head scaled 2x with a shoulder line, on transparent
    im=colorize(build('down',0,cfg),cfg); im=extras(im,'down',cfg,0,False)
    head=im.crop((1,0,15,13)).resize((28,26),Image.NEAREST)
    P=Image.new('RGBA',(38,38),(0,0,0,0)); P.alpha_composite(head,(5,10))
    return P
# ---------------- the cast (original designs)
CAST={
 'c15':dict(name='Hero',cloth='#8e2a22',accent='#8e2a22',sleeve='#8a9096',legs='#5a4632',belt='#6e4a24',haircol='#5c3a22',skin='#ce986c',shield=True,helmet=False),
 'c9': dict(name='Elder Oren',cloth='#7a7a74',accent='#62625c',robe=True,beard=True,haircol='#e8e0d0',skin='#d4a07a',staff=True),
 'c6': dict(name='Mira',cloth='#3a528c',accent='#e8e0d0',sleeve='#3a528c',legs='#3a528c',skirt=True,haircol='#a0402a',hair='scarf',skin='#d8a07a'),
 'c8': dict(name='Bo the guard',cloth='#70767c',accent='#2c4a7a',sleeve='#5a6066',helmet=True,haircol='#3e2a18',skin='#c08a60'),
 'c25':dict(name='Pip',cloth='#5d8a3a',accent='#d4aa30',haircol='#2e1d12',skin='#a8704a'),
 'c19':dict(name='Smith Hana',cloth='#4a3a30',accent='#6e4a24',sleeve='#ce986c',haircol='#1e1712',skin='#ce986c',gloves='#3e2a18'),
 'c10':dict(name='Innkeeper Tomas',cloth='#e8e0d0',accent='#8a5a2c',sleeve='#e8e0d0',legs='#4a3a30',haircol='#7a4a2a',beard=True,beardcol='#7a4a2a',skin='#d49a70'),
 'c2': dict(name='Farmer Ade',cloth='#6a7a3a',accent='#b0904a',legs='#4a5a7a',haircol='#c9a227',hair='hood',skin='#9a6a48'),
 'c5': dict(name='Sister Lin',cloth='#e8e0d0',accent='#c2410c',robe=True,haircol='#1e1712',hair='hood',skin='#e0b08a'),
 'c13':dict(name='Traveller',cloth='#5a4a32',accent='#3e2a18',haircol='#3e2a18',hair='hood',skin='#c08a60'),
 'c3': dict(name='Fisher Jun / Dave',cloth='#3a6a7a',accent='#e8e0d0',haircol='#4a3020',beard=True,beardcol='#4a3020',skin='#d49a70'),
 'c12':dict(name='Weaver Sol / Sofia',cloth='#7a3a6a',accent='#d4aa30',haircol='#e0b040',hair='long',skin='#e0b08a'),
 'c24':dict(name='Courier Vee',cloth='#a85a2a',accent='#e8e0d0',haircol='#1e1712',skin='#7a4a30'),
 'c22':dict(name='Gary',cloth='#c2410c',accent='#e8e0d0',sleeve='#ce986c',haircol='#ce986c',hair='bald',skin='#ce986c'),
 'c17':dict(name='Kate',cloth='#2c8a8a',accent='#e8e0d0',legs='#1e2a3a',haircol='#e0b040',hair='long',skin='#e0b08a'),
 'c16':dict(name='Larry',cloth='#8a6a4a',accent='#c2410c',haircol='#c2410c',hair='helmet',skin='#d49a70'),
 'c21':dict(name='The Machine',cloth='#70767c',accent='#5ac8e0',sleeve='#5a6066',legs='#5a6066',boots='#3a3e42',helmet=True,haircol='#5a6066',skin='#8a9096',eye='#5ac8e0'),
 'c4': dict(name='Yuki',cloth='#8a5aa8',accent='#e8e0d0',haircol='#c87ab0',hair='long',skin='#e8c09a'),
 'c14':dict(name='Brick',cloth='#5a4632',accent='#8e2a22',sleeve='#9a6a48',haircol='#2e1d12',skin='#9a6a48'),
 'c18':dict(name='Dark Knight',cloth='#2e2a34',accent='#5a1a1a',sleeve='#3a3640',legs='#2e2a34',boots='#1e1a22',helmet=True,haircol='#2e2a34',skin='#3a3640',eye='#e04030'),
 'c20':dict(name='Titan Guard',cloth='#8a6a2a',accent='#d4aa30',sleeve='#9a6a48',helmet=True,haircol='#c87a2a',beard=True,beardcol='#c87a2a',skin='#c08a60'),
 'c7': dict(name='Shadow',cloth='#1e1a28',accent='#3a2a5a',haircol='#1e1a28',hair='hood',skin='#2a2436',eye='#b080ff',robe=True),
 'c11':dict(name='Frost Giant',cloth='#a0c0d8',accent='#e8f0f8',haircol='#e8f0f8',beard=True,beardcol='#e8f0f8',skin='#8aa8c0',eye='#2a4a8a'),
 'c1': dict(name='Goblin',cloth='#6e4a24',accent='#8a5a2c',sleeve='#58843f',legs='#3e5a2a',boots='#2e1d12',haircol='#3e5a2a',hair='bald',skin='#58843f',eye='#ffd23f',ears=True),
 'c23':dict(name='Skeleton',bones=True,cloth='#d8d0c0',accent='#b8b0a0',sleeve='#d8d0c0',legs='#d8d0c0',boots='#b8b0a0',belt='#6e4a24',haircol='#e8e0d0',hair='bald',skin='#e8e0d0',eye='#1a1410'),
}
if __name__=='__main__':
    import os
    out='/tmp/art/chars2'; os.makedirs(out,exist_ok=True); os.makedirs(out+'/face',exist_ok=True)
    for k,cfg in CAST.items():
        sheet(cfg).save(f'{out}/{k}.png'); portrait(cfg).save(f'{out}/face/{k}.png')
    print(len(CAST))
