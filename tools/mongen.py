# Pulse monster generator — original creatures, same palette rules: dark ink outline, flat 3-4 tone ramps, light from the upper left.
import math
from PIL import Image, ImageDraw
import sys; sys.path.insert(0,'/tmp/art')
from envgen import C, sh, outline, shade_ellipse, hh, canvas
K=(30,23,18)
def eyes(d,face,xs,y,col='#1e1712',glow=None):
    if face=='back': return
    if face=='side': xs=[x+2 for x in xs[-1:]]
    for x in xs:
        if glow: d.point((x,y),fill=C(glow)); d.point((x,y-1),fill=sh(C(glow),1.2))
        else: d.point((x,y),fill=C(col)); d.point((x,y-1),fill=C('#ffffff'))
def ramp(*h): return h
# each creature: draw(d, face, f) on a 16x16 canvas; f = animation frame 0..3
def slime(d,face,f):
    sq=[0,1,0,-1][f]; shade_ellipse(d,(1,6+sq,14,15),ramp('#a6c86a','#86a84e','#5e8a3a','#3e6428'))
    d.point((4,8+sq),fill=C('#ffffff')); d.point((5,8+sq),fill=C('#d8f0b0')); eyes(d,face,[5,10],11)
def shroom(d,face,f):
    b=[0,1,0,1][f]; d.rectangle((5,9,10,14),fill=C('#e0d0b0')); d.rectangle((8,9,10,14),fill=C('#c0b090'))
    d.point((5,15-b),fill=C('#8a6a4a')); d.point((10,15-(1-b)),fill=C('#8a6a4a'))
    shade_ellipse(d,(1,2,14,10),ramp('#d0603a','#b04a2c','#8a3420','#5e2214'))
    for x,y in ((4,4),(9,3),(11,6),(6,7)): d.point((x,y),fill=C('#f0e0c8'))
    eyes(d,face,[6,9],12)
def beetle(d,face,f,col=('#5e8a4a','#46703a','#34582c','#24401e')):
    lg=f%2
    for i,y in enumerate((8,10,12)): d.line((2,y+lg*(i%2),0,y+1),fill=C('#2a1d16')); d.line((13,y+(1-lg)*(i%2),15,y+1),fill=C('#2a1d16'))
    shade_ellipse(d,(2,4,13,15),col); d.line((7,5,7,14),fill=C(col[3])); d.line((8,5,8,14),fill=sh(C(col[0]),1.1))
    shade_ellipse(d,(4,1,11,6),ramp('#3a3a3a','#2a2a2a','#1e1e1e','#141414')); eyes(d,face,[5,9],3,glow='#ffd23f')
def scarab(d,face,f): beetle(d,face,f,('#e0803a','#c0602a','#8a3a1c','#5e2412'))
def viper(d,face,f,col=('#86a446','#6a8a36','#4e6e28','#36521c')):
    s=[0,1,0,-1][f]
    shade_ellipse(d,(1,10,14,15),col); shade_ellipse(d,(3,8,12,12),col)
    d.rectangle((7,4,10,9),fill=C(col[1])); shade_ellipse(d,(6+s,1,13+s,7),col)
    d.point((12+s,6),fill=C('#c84a3a')); d.point((13+s,7),fill=C('#c84a3a')); eyes(d,face,[8+s,11+s],3)
    for x in range(2,14,3): d.point((x,13),fill=C(col[0]))
def sandviper(d,face,f): viper(d,face,f,('#e0a050','#c47a32','#9a5424','#6a3416'))
def moss(d,face,f):
    sq=[0,1,0,0][f]; shade_ellipse(d,(1,5+sq,14,15),ramp('#7a9a46','#5e7e36','#465e28','#30421c'))
    for i in range(8): d.point((int(2+11*hh(i,31)),int(6+8*hh(i,32))+sq),fill=C(('#a6b84e','#3e5a2a')[i%2]))
    d.line((7,4+sq,7,1+sq),fill=C('#5e3c1c')); d.point((8,2+sq),fill=C('#86a446')); d.point((6,1+sq),fill=C('#86a446'))
    eyes(d,face,[5,10],10+sq,glow='#ffe080')
def crab(d,face,f):
    c=ramp('#b0705a','#8a5040','#6a3a2c','#4a261c'); cl=f%2
    shade_ellipse(d,(3,7,12,14),c)
    shade_ellipse(d,(0,3-cl,5,8-cl),c); shade_ellipse(d,(10,3-(1-cl),15,8-(1-cl)),c)
    d.point((2,4-cl),fill=(0,0,0,0)); d.point((13,4-(1-cl)),fill=(0,0,0,0))
    for x in (3,5,10,12): d.line((x,13,x-1 if x<8 else x+1,15),fill=C('#4a261c'))
    d.line((6,7,6,5),fill=C('#4a261c')); d.line((9,7,9,5),fill=C('#4a261c')); d.point((6,4),fill=C('#1e1712')); d.point((9,4),fill=C('#1e1712'))
def bear(d,face,f):
    c=ramp('#a8743c','#8a5a2c','#6e4626','#4a2e18'); b=f%2
    shade_ellipse(d,(1,6,14,15),c); shade_ellipse(d,(3,1,12,9),c)
    shade_ellipse(d,(2,0,5,3),c); shade_ellipse(d,(10,0,13,3),c)
    if face!='back': d.ellipse((6,5,9,8),fill=C('#d8b080')); d.point((7,5),fill=C('#1e1712')); d.point((8,5),fill=C('#1e1712'))
    eyes(d,face,[5,10],4)
    d.rectangle((2,13+b,4,15),fill=C('#4a2e18')); d.rectangle((11,13+(1-b),13,15),fill=C('#4a2e18'))
def golem(d,face,f):
    c=ramp('#8a6a4a','#6e5238','#56402c','#3a2a1c'); b=[0,1,0,1][f]
    d.rectangle((2,5,13,13),fill=C(c[1])); d.rectangle((2,5,7,13),fill=C(c[0])); d.rectangle((11,5,13,13),fill=C(c[2]))
    d.rectangle((4,1,11,6),fill=C(c[1])); d.rectangle((4,1,7,6),fill=C(c[0]))
    d.rectangle((0,6,2,11+b),fill=C(c[2])); d.rectangle((13,6,15,11+(1-b)),fill=C(c[2]))
    d.rectangle((3,13,6,15),fill=C(c[3])); d.rectangle((9,13,12,15),fill=C(c[3]))
    for i in range(5): d.point((int(3+9*hh(i,41)),int(6+6*hh(i,42))),fill=C('#3a2a1c'))
    eyes(d,face,[6,9],3,glow='#ffb43a')
def fish(d,face,f):
    c=ramp('#5ab0a0','#3a8a7e','#2a6a62','#1c4a44'); w=[0,1,0,-1][f]
    shade_ellipse(d,(1,4,14,14),c); d.polygon([(7,4),(10,0+w),(11,5)],fill=C(c[2]))
    d.line((3,11,12,11),fill=C('#d8e8c0')); d.line((4,12,11,12),fill=C('#1e1712'))
    eyes(d,face,[4,11],7,col='#1e1712'); d.point((1,9),fill=C(c[3])); d.point((14,9),fill=C(c[3]))
def lizard(d,face,f):
    c=ramp('#86a446','#6a8a36','#4e6e28','#36521c'); b=f%2
    d.line((8,13,13,15),fill=C(c[2]),width=2)
    shade_ellipse(d,(4,6,11,14),c); shade_ellipse(d,(4,1,12,7),c)
    d.ellipse((5,8,10,13),fill=C('#d8c890'))
    d.line((4,9,2,11+b),fill=C(c[2])); d.line((11,9,13,11+(1-b)),fill=C(c[2])); d.line((5,13,4,15),fill=C(c[3])); d.line((10,13,11,15),fill=C(c[3]))
    eyes(d,face,[6,10],3,glow='#ffd23f')
def wisp(d,face,f,col=('#e8f4ff','#b8dcf4','#7ab0e0','#4a80c0')):
    b=[0,-1,0,1][f]
    shade_ellipse(d,(3,5+b,12,14+b),col); d.polygon([(4,9+b),(8,0+b+f%2),(11,9+b)],fill=C(col[1])); d.polygon([(6,8+b),(8,3+b),(10,8+b)],fill=C(col[0]))
    eyes(d,face,[6,9],10+b)
def flame(d,face,f): wisp(d,face,f,('#ffe080','#ffb43a','#e0602a','#a83a1a'))
def eye(d,face,f):
    b=[0,-1,0,1][f]
    for i,x in enumerate((4,8,11)): d.line((x,11+b,x+(1 if f%2 else -1),15),fill=C('#5a8a4a'))
    shade_ellipse(d,(2,1+b,13,12+b),ramp('#f4ece0','#d8ccb8','#b0a48c','#8a7e68'))
    if face!='back':
        d.ellipse((5,4+b,11,10+b),fill=C('#5ab0a0')); d.ellipse((7,6+b,9,8+b),fill=C('#1e1712')); d.point((6,5+b),fill=C('#ffffff'))
def troll(d,face,f):
    c=ramp('#7a9aa8','#5e7e8c','#46606c','#30444c'); b=f%2
    shade_ellipse(d,(1,4,14,15),c); shade_ellipse(d,(4,0,11,7),c)
    d.rectangle((0,7,2,13+b),fill=C(c[2])); d.rectangle((13,7,15,13+(1-b)),fill=C(c[2]))
    d.rectangle((3,8,12,12),fill=C('#6e4626')); d.line((3,8,12,8),fill=C('#8a5a2c'))
    if face!='back': d.point((6,6),fill=C('#e8e0d0')); d.point((9,6),fill=C('#e8e0d0'))
    eyes(d,face,[6,9],3,glow='#ffd23f')
def bat(d,face,f):
    up=f%2; c=ramp('#a83a2a','#8a2a1e','#6a1e16','#4a1410')
    shade_ellipse(d,(5,4,10,11),ramp('#5a3a3a','#4a2e2e','#3a2222','#2a1818'))
    if up: d.polygon([(5,7),(0,1),(1,7),(3,9)],fill=C(c[1])); d.polygon([(10,7),(15,1),(14,7),(12,9)],fill=C(c[1]))
    else: d.polygon([(5,6),(0,11),(2,12),(5,9)],fill=C(c[1])); d.polygon([(10,6),(15,11),(13,12),(10,9)],fill=C(c[1]))
    d.point((6,3),fill=C('#5a3a3a')); d.point((9,3),fill=C('#5a3a3a'))
    eyes(d,face,[6,9],6,glow='#ffd23f')
def imp(d,face,f):
    c=ramp('#d0a060','#b08040','#8a6030','#5e4020'); b=f%2
    shade_ellipse(d,(4,6,11,14),c); shade_ellipse(d,(3,1,12,8),c)
    d.point((3,1),fill=C('#e8e0d0')); d.point((2,0),fill=C('#e8e0d0')); d.point((12,1),fill=C('#e8e0d0')); d.point((13,0),fill=C('#e8e0d0'))
    d.line((11,12,14,9-b),fill=C(c[2])); d.point((14,8-b),fill=C('#c2412c'))
    d.line((5,14,5,15),fill=C(c[3])); d.line((10,14,10,15),fill=C(c[3]))
    if face!='back': d.line((6,7,9,7),fill=C('#1e1712'))
    eyes(d,face,[5,10],4,glow='#ff6a3a')
def skull(d,face,f):
    b=[0,-1,0,1][f]
    for i in range(5): d.point((int(3+10*hh(i+f,51)),int(9+4*hh(i,52))+b),fill=C(('#ff8a3a','#ffd23f','#e0402a')[i%3]))
    shade_ellipse(d,(3,1+b,12,10+b),ramp('#f4ece0','#d8ccb8','#b0a48c','#8a7e68')); d.rectangle((5,9+b,10,11+b),fill=C('#d8ccb8'))
    if face!='back':
        d.rectangle((5,5+b,6,6+b),fill=C('#1e1712')); d.rectangle((9,5+b,10,6+b),fill=C('#1e1712')); d.point((5,5+b),fill=C('#ff4a2a')); d.point((10,5+b),fill=C('#ff4a2a'))
        for x in (6,8,10): d.point((x-0,10+b),fill=C('#1e1712'))
def owl(d,face,f):
    c=ramp('#c8a870','#a88850','#886838','#5e4624'); w=f%2
    shade_ellipse(d,(2,3,13,15),c); shade_ellipse(d,(4,8,11,15),ramp('#f0e0c0','#d8c8a0','#b8a880','#988860'))
    d.polygon([(2,6),(0,12-w),(3,12)],fill=C(c[2])); d.polygon([(13,6),(15,12-w),(12,12)],fill=C(c[2]))
    d.point((3,2),fill=C(c[2])); d.point((12,2),fill=C(c[2]))
    if face!='back': d.ellipse((3,4,7,8),fill=C('#f0e0c0')); d.ellipse((8,4,12,8),fill=C('#f0e0c0')); d.point((7,8),fill=C('#d4aa30'))
    eyes(d,face,[5,10],6,glow='#ffb43a')
def scarecrow(d,face,f):
    s=[0,1,0,-1][f]
    d.line((7,6,7,15),fill=C('#6e4626')); d.line((8,6,8,15),fill=C('#5e3c1c'))
    d.line((0,7+s,15,7-s),fill=C('#6e4626'))
    d.rectangle((4,6,11,12),fill=C('#5a6a3a')); d.rectangle((4,6,6,12),fill=C('#6a7a46'))
    for x in (4,6,9,11): d.line((x,12,x+(1 if x>8 else -1),14),fill=C('#d4aa30'))
    d.point((0,8+s),fill=C('#d4aa30')); d.point((15,8-s),fill=C('#d4aa30'))
    shade_ellipse(d,(4,1,11,7),ramp('#d8c090','#b8a070','#988050','#786034'))
    d.rectangle((2,0,13,1),fill=C('#5e3c1c')); d.rectangle((5,-1,10,0),fill=C('#6e4626'))
    if face!='back': d.point((6,4),fill=C('#1e1712')); d.point((9,4),fill=C('#1e1712')); d.line((6,6,9,6),fill=C('#1e1712'))
MONS={'m18':slime,'m21':shroom,'m16':beetle,'m6':viper,'m3':moss,'m1':crab,'m8':bear,'m11':golem,'m22':fish,'m12':lizard,'m7':wisp,'m20':sandviper,'m15':scarab,'m10':imp,'m17':eye,'m14':troll,'m2':flame,'m9':bat,'m19':skull,'m13':owl,'m4':scarecrow}
NAMES={'m18':'Slime','m21':'Shroomling','m16':'Shellback','m6':'Grass Viper','m3':'Moss Blob','m1':'Rock Crab','m8':'Cave Bear','m11':'Mud Golem','m22':'Bog Lurker','m12':'Marsh Lizard','m7':'Wisp','m20':'Sand Viper','m15':'Fire Scarab','m10':'Dust Imp','m17':'Watcher','m14':'Troll','m2':'Ember Sprite','m9':'Fire Bat','m19':'Demon Skull','m13':'Sky Sentinel','m4':'Scarecrow'}
def frame(fn,face,f):
    im=canvas(16,16); d=ImageDraw.Draw(im); fn(d,face,f)
    if face=='back':
        px=im.load()
        for y in range(16):
            for x in range(16):
                if px[x,y][3]: px[x,y]=sh(px[x,y],0.86)
    return outline(im)
def sheet(fn):
    S=canvas(64,64)
    for col,face in enumerate(('front','back','side','side')):
        for f in range(4):
            im=frame(fn,face,f)
            if col==2: im=im.transpose(Image.FLIP_LEFT_RIGHT)  # 'side' is drawn facing right
            S.alpha_composite(im,(col*16,f*16))
    return S
if __name__=='__main__':
    import os; os.makedirs('/tmp/art/mon2',exist_ok=True)
    for k,fn in MONS.items(): sheet(fn).save(f'/tmp/art/mon2/{k}.png')
    from PIL import ImageDraw as D2
    keys=list(MONS); sc=5; P=Image.new('RGB',(11*100,2*120),(60,84,44)); d=D2.Draw(P)
    for i,k in enumerate(keys):
        im=Image.open(f'/tmp/art/mon2/{k}.png').crop((0,0,16,16)).resize((80,80),Image.NEAREST); x=(i%11)*100+10; y=(i//11)*120+28
        P.paste(im,(x,y),im); d.text((x,y-16),NAMES[k],fill=(255,230,150))
    P.save('/tmp/art/mon_preview.png'); print(len(keys))
