# Pulse environment art generator — original tiles and props in the chunky, earthy house style.
import math, json
from PIL import Image, ImageDraw
K=(30,23,18,255)
def C(h,a=255): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))+(a,)
def sh(c,f): return tuple(max(0,min(255,int(v*f))) for v in c[:3])+(c[3] if len(c)>3 else 255,)
def hh(x,y,s=0):
    h=(x*374761393+y*668265263+s*1442695041)&0xffffffff; h=((h^(h>>13))*1274126177)&0xffffffff; return ((h^(h>>16))&0xffffffff)/4294967296
def outline(im):
    px=im.load(); w,h=im.size; out=im.copy(); o=out.load()
    for y in range(h):
        for x in range(w):
            if px[x,y][3]<10 and any(0<=x+dx<w and 0<=y+dy<h and px[x+dx,y+dy][3]>200 and px[x+dx,y+dy][:3]!=K[:3] for dx,dy in ((1,0),(-1,0),(0,1),(0,-1))): o[x,y]=K
    return out
# ---------------- ground tiles (seamless: noise is computed modulo 16)
def tile(fn):
    im=Image.new('RGBA',(16,16)); px=im.load()
    for y in range(16):
        for x in range(16): px[x,y]=fn(x,y)
    return im
def grass(base,light,dark,seed):
    b,l,d=C(base),C(light),C(dark)
    def f(x,y):
        r=hh(x,y,seed)
        if r<0.10: return l
        if r<0.2: return d
        if hh(x,(y+1)%16,seed)<0.1 and r<0.35: return d  # blade shadow under highlights
        return b
    return tile(f)
def dirt(base,light,dark,seed,flecks=None):
    b,l,d=C(base),C(light),C(dark)
    def f(x,y):
        r=hh(x,y,seed)
        if flecks and r<0.07: return C(flecks)
        if r<0.13: return d
        if r<0.2: return l
        return b
    return tile(f)
def flags(base,mortar,seed,size=8):
    b,m=C(base),C(mortar)
    def f(x,y):
        row=y//size; off=(size//2)*(row%2)
        cx=(x+off)%16
        if y%size==0 or cx%size==0: return m
        stone=(cx//size, row)
        v=0.88+0.18*hh(stone[0],stone[1],seed)
        c=sh(b,v)
        if y%size==1 or cx%size==1: c=sh(c,1.12)
        if hh(x,y,seed)<0.05: c=sh(c,0.85)
        return c
    return tile(f)
def cobble(base,gap,seed):
    b,g=C(base),C(gap)
    cs=[(3,3),(11,2),(7,8),(14,9),(2,12),(10,14),(6,0)]
    def f(x,y):
        best=9e9;sec=9e9;bi=0
        for i,(cx,cy) in enumerate(cs):
            for ox in(-16,0,16):
                for oy in(-16,0,16):
                    d=(x-cx-ox)**2+(y-cy-oy)**2
                    if d<best: sec=best;best=d;bi=i
                    elif d<sec: sec=d
        if math.sqrt(sec)-math.sqrt(best)<1.1: return g
        c=sh(b,0.9+0.2*hh(bi,0,seed))
        return sh(c,1.12) if math.sqrt(best)<1.5 else c
    return tile(f)
def bricks(base,mortar,seed): return flags(base,mortar,seed,size=4)
def water(seed):
    b,l,d=C('#3a6088'),C('#5a86b0'),C('#2e4e72')
    def f(x,y):
        w=math.sin((x+y*0.5)*0.8)+math.sin(y*1.1+x*0.2)
        if w>1.6 and hh(x,y,seed)<0.6: return l
        if w<-1.4: return d
        return b
    return tile(f)
def snow(seed,sparkle=False):
    b,d,w=C('#e6eaf0'),C('#c8d2e2'),C('#ffffff')
    def f(x,y):
        r=hh(x,y,seed)
        if sparkle and r<0.03: return w
        if r<0.12: return d
        return b
    return tile(f)
def ice(seed):
    b,l,d=C('#a8c4dc'),C('#d6e6f4'),C('#86a6c4')
    def f(x,y):
        if (x+y*2)%13==0 and hh(x,y,seed)<0.7: return l
        if hh(x,y,seed)<0.1: return d
        return b
    return tile(f)
GROUND={
 'ts,22,11':grass('#6a8a36','#86a446','#56742a',1),
 'ts,23,11':grass('#557a2e','#6a8a36','#456424',2),
 'ts,24,11':dirt('#9a7a4c','#b0905e','#7c6038',3,flecks='#6a8a36'),
 'ts,25,11':dirt('#7c6040','#927452','#5e4830',4,flecks='#557a2e'),
 'ts,20,11':dirt('#c4a670','#d8bc86','#a88c5a',5),
 'ts,19,11':flags('#a8987e','#6e6252',6),
 'ts,18,11':cobble('#8e8476','#4a4238',7),
 'ts,26,11':bricks('#a86e4c','#5e3a26',8),
 'ts,15,19':snow(9),'ts,13,19':snow(10,True),'ts,19,19':ice(11),
 'ts,23,6':water(12),
 'inf,13,13':flags('#5a5258','#2e282e',13),
}
# ---------------- props
def canvas(w,h): return Image.new('RGBA',(w,h),(0,0,0,0))
def shade_ellipse(d,box,ramp,light=(-0.7,-0.7)):
    x0,y0,x1,y1=box; cx=(x0+x1)/2; cy=(y0+y1)/2; rx=(x1-x0)/2; ry=(y1-y0)/2
    for y in range(int(y0),int(y1)+1):
        for x in range(int(x0),int(x1)+1):
            nx=(x+.5-cx)/rx; ny=(y+.5-cy)/ry
            if nx*nx+ny*ny<=1:
                lit=-(nx*light[0]+ny*light[1])*-1
                lit=-(nx*0.65+ny*0.75)+0.12*math.sin(x*1.9)*math.cos(y*1.4)
                i=0 if lit>0.5 else 1 if lit>0 else 2 if lit>-0.55 else 3
                d.point((x,y),fill=C(ramp[min(i,len(ramp)-1)]))
def tree(w,h,circles,ramp,trunk,trunk_ramp=('#8a5a2c','#5e3c1c')):
    im=canvas(w,h); d=ImageDraw.Draw(im)
    if trunk:
        tx,ty,tw,th=trunk
        d.rectangle((tx,ty,tx+tw-1,ty+th-1),fill=C(trunk_ramp[0])); d.rectangle((tx+tw//2,ty,tx+tw-1,ty+th-1),fill=C(trunk_ramp[1]))
        d.point((tx-1,ty+th-1),fill=C(trunk_ramp[0])); d.point((tx+tw,ty+th-1),fill=C(trunk_ramp[1]))
    for c in circles: shade_ellipse(d,(c[0]-c[2],c[1]-c[2]*c[3] if len(c)>3 else c[1]-c[2],c[0]+c[2],c[1]+(c[2]*c[3] if len(c)>3 else c[2])),ramp)
    return outline(im)
OAK=('#86a446','#6a8a36','#4e6e28','#36521c')
BIRCH=('#a6b84e','#869a3c','#66782c','#4a5a20')
PINE=('#5e8a4a','#46703a','#34582c','#24401e')
def pine(w=32,h=32,snowy=False):
    im=canvas(w,h); d=ImageDraw.Draw(im)
    d.rectangle((14,24,17,29),fill=C('#5e3c1c')); d.rectangle((14,24,15,29),fill=C('#8a5a2c'))
    tiers=[(16,3,4),(16,8,7),(16,14,10),(16,20,13)]
    for cx,top,hw in tiers:
        for y in range(top,top+7):
            span=int(hw*(y-top+1)/7)
            for x in range(cx-span,cx+span+1):
                lit=(cx-x)/max(1,hw)*0.8-(y-top)/7*0.5+0.2
                col=PINE[0] if lit>0.45 else PINE[1] if lit>0.05 else PINE[2] if lit>-0.4 else PINE[3]
                if snowy and y<=top+2 and hh(x,y)<0.85: col='#eef2f8' if lit>0 else '#c8d2e2'
                d.point((x,y),fill=C(col))
    return outline(im)
def rockshape(w,h,box,ramp):
    im=canvas(w,h); d=ImageDraw.Draw(im); shade_ellipse(d,box,ramp)
    px=im.load()
    for i in range(6):
        x=int(box[0]+(box[2]-box[0])*hh(i,1)); y=int(box[1]+(box[3]-box[1])*(0.3+0.5*hh(i,2)))
        if px[x,y][3]: d.line((x,y,x+2,y+1),fill=C(ramp[3]))
    return outline(im)
STONE=('#b8b0a2','#958c7e','#6e665a','#4a443c'); DSTONE=('#7a8288','#5e666c','#464c52','#30353a')
def building(w,h,roof,wall,roofcol,wallcol,trim,door=True,windows=2,chimney=False,sign=None,lit=True,ruin=False,overgrown=False):
    im=canvas(w,h); d=ImageDraw.Draw(im)
    roofh=int(h*0.5); wy0=roofh-2
    if not ruin:
        # walls
        d.rectangle((3,wy0,w-4,h-2),fill=C(wallcol))
        if wall=='timber':
            for x in range(3,w-3,max(8,(w-6)//4)): d.rectangle((x,wy0,x+1,h-2),fill=C(trim))
            d.rectangle((3,wy0,w-4,wy0+1),fill=C(trim)); d.rectangle((3,h-6,w-4,h-5),fill=C(trim))
        if wall=='stone':
            for y in range(wy0,h-2,4):
                for x in range(3+(2 if (y//4)%2 else 0),w-4,6): d.rectangle((x,y,x+4,y+2),fill=sh(C(wallcol),0.9+0.2*hh(x,y)))
        if wall=='wood':
            for x in range(3,w-4,3): d.line((x,wy0,x,h-2),fill=sh(C(wallcol),0.82))
        d.rectangle((3,h-4,w-4,h-2),fill=C('#7a7266'))
        for x in range(3,w-4,4): d.point((x,h-3),fill=C('#5a544a'))
        # windows
        slots=[int(w*0.22),int(w*0.78)-6] if windows==2 else [int(w*0.7)-3] if windows==1 else []
        for wx in slots:
            wy=wy0+5; d.rectangle((wx-1,wy-1,wx+6,wy+5),fill=K[:3])
            d.rectangle((wx,wy,wx+5,wy+4),fill=C('#ffd25a' if lit else '#3a4a5a')); d.line((wx+3,wy,wx+3,wy+4),fill=K[:3]); d.line((wx,wy+2,wx+5,wy+2),fill=K[:3])
            d.rectangle((wx,wy,wx+1,wy),fill=C('#fff0b0' if lit else '#5a6a7a'))
            d.rectangle((wx-1,wy+6,wx+6,wy+6),fill=C('#6e4a24'))
        if door:
            dx=w//2-4; d.rectangle((dx-1,h-14,dx+8,h-2),fill=K[:3]); d.rectangle((dx,h-13,dx+7,h-2),fill=C('#6e4626')); d.rectangle((dx+4,h-13,dx+7,h-2),fill=C('#583818')); d.point((dx+6,h-8),fill=C('#d4aa30'))
            d.rectangle((dx,h-13,dx+7,h-13),fill=C('#8a5a30'))
        # roof
        for y in range(2,roofh+1):
            inset=int((roofh-y)*0.45)
            x0=1+inset; x1=w-2-inset
            for x in range(x0,x1+1):
                rc=C(roofcol)
                if roof=='thatch': c=sh(rc,0.85+0.3*hh(x,y)) if (x+y)%3 else sh(rc,0.78)
                elif roof=='slate': c=sh(rc,1.0 if ((x+(y//3)%2*3)//6+y//3)%2 else 0.86); c=sh(c,0.75) if y%3==0 else c
                else: c=sh(rc,1.0 if (x//4+y//3)%2 else 0.88); c=sh(c,0.7) if y%3==0 else c
                if x-x0<2: c=sh(c,1.18)
                if x1-x<2: c=sh(c,0.75)
                d.point((x,y),fill=c)
        d.line((1,roofh,w-2,roofh),fill=sh(C(roofcol),0.55)); d.line((1,roofh+1,w-2,roofh+1),fill=C('#2a1d16'))
        if chimney:
            cx=w-int(w*0.3); d.rectangle((cx,0,cx+5,int(roofh*0.55)),fill=C('#8e8476')); d.rectangle((cx,0,cx+5,1),fill=C('#5e564a')); d.rectangle((cx+3,2,cx+5,int(roofh*0.55)),fill=C('#6e665a'))
        if sign:
            d.rectangle((w-12,wy0+2,w-5,wy0+7),fill=C('#6e4626')); d.point((w-9,wy0+4),fill=C(sign)); d.point((w-8,wy0+4),fill=C(sign)); d.point((w-9,wy0+5),fill=C(sign)); d.point((w-8,wy0+5),fill=C(sign))
    else:
        # ruined walls: broken stone outline, collapsed beams, rubble
        d.rectangle((3,h//2,w-4,h-2),fill=C('#8e8476'))
        for x in range(3,w-4):
            top=h//2-int(6*abs(math.sin(x*0.45)))-int(4*hh(x,3))
            d.line((x,top,x,h//2),fill=C('#8e8476'))
            if hh(x,4)<0.5: d.point((x,top),fill=C('#b8b0a2'))
        for y in range(h//2,h-2,4):
            for x in range(3+(2 if (y//4)%2 else 0),w-4,6): d.rectangle((x,y,x+4,y+2),fill=sh(C('#8e8476'),0.85+0.25*hh(x,y)))
        dx=w//2-4; d.rectangle((dx,h-13,dx+7,h-2),fill=C('#1e1712'))
        d.line((6,h//2-2,w//2,h//2-9),fill=C('#5e3c1c'),width=2); d.line((w-8,h//2,w//2+3,h//2-6),fill=C('#5e3c1c'),width=2)
        for i in range(10):
            x=int(2+(w-6)*hh(i,7)); y=h-3-int(3*hh(i,8)); d.rectangle((x,y,x+2,y+1),fill=C(STONE[int(hh(i,9)*3)]))
        if overgrown:
            for i in range(40):
                x=int(3+(w-7)*hh(i,11)); y=int(h*0.35+h*0.55*hh(i,12)); d.point((x,y),fill=C(OAK[int(hh(i,13)*3)]))
    return outline(im)
def stall():
    im=canvas(32,32); d=ImageDraw.Draw(im)
    d.rectangle((3,12,5,30),fill=C('#5e3c1c')); d.rectangle((26,12,28,30),fill=C('#5e3c1c'))
    d.rectangle((2,20,29,27),fill=C('#8a5a2c')); d.rectangle((2,20,29,21),fill=C('#a8743c'))
    for i,c in enumerate(('#c84a3a','#d4aa30','#86a446','#c84a3a')): d.rectangle((5+i*6,17,9+i*6,19),fill=C(c))
    for x in range(1,31):
        col='#c2412c' if (x//4)%2 else '#e8e0d0'
        d.line((x,4,x,12),fill=C(col))
    d.line((1,13,30,13),fill=sh(C('#c2412c'),0.7))
    return outline(im)
def arch():  # village gateway (replaces the pack's shrine arch)
    im=canvas(48,32); d=ImageDraw.Draw(im)
    for x0 in (4,39): d.rectangle((x0,8,x0+4,31),fill=C('#6e4626')); d.rectangle((x0+3,8,x0+4,31),fill=C('#4a2e18'))
    d.rectangle((0,4,47,8),fill=C('#5e3c1c')); d.rectangle((0,4,47,5),fill=C('#8a5a2c'))
    d.rectangle((14,9,33,14),fill=C('#8a5a2c')); d.rectangle((15,10,32,13),fill=C('#d8c8a0'))
    for x in range(17,31,3): d.point((x,11),fill=C('#5e3c1c'))
    d.rectangle((8,12,9,14),fill=C('#d4aa30')); d.rectangle((38,12,39,14),fill=C('#d4aa30'))
    return outline(im)
def small(fn,w=16,h=16):
    im=canvas(w,h); d=ImageDraw.Draw(im); fn(d); return outline(im)
def fence(d): d.rectangle((2,4,4,15),fill=C('#6e4626')); d.rectangle((11,4,13,15),fill=C('#6e4626')); d.rectangle((0,6,15,7),fill=C('#8a5a2c')); d.rectangle((0,11,15,12),fill=C('#8a5a2c')); d.point((3,4),fill=C('#a8743c')); d.point((12,4),fill=C('#a8743c'))
def flowers(d):
    for i,(x,y) in enumerate(((3,6),(9,4),(12,10),(5,11),(10,13))):
        d.line((x,y+1,x,y+3),fill=C('#4e6e28')); col=('#e8e0d0','#d4aa30','#c84a6a','#9a7ad0','#e8e0d0')[i]; d.point((x,y),fill=C(col)); d.point((x-1,y),fill=sh(C(col),0.8)); d.point((x+1,y),fill=sh(C(col),0.8)); d.point((x,y-1),fill=sh(C(col),1.1))
def dots(d):
    for i in range(7): d.point((int(2+12*hh(i,1)),int(3+11*hh(i,2))),fill=C(('#e8e0d0','#d4aa30')[i%2]))
def tuft(d):
    for x in (5,7,9,11): d.line((x,13,x+(1 if x>8 else -1),8+(x%3)),fill=C('#4e6e28')); d.point((x+(1 if x>8 else -1),8+(x%3)),fill=C('#86a446'))
def tuft2(d):
    for x in (4,6,8,10,12): d.line((x,14,x,6+(x%4)),fill=C('#5e7a32')); d.point((x,6+(x%4)),fill=C('#a8b86a'))
def clover(d):
    for cx,cy in ((6,8),(10,8),(8,11)): d.ellipse((cx-2,cy-2,cx+2,cy+2),fill=C('#6a8a36')); d.point((cx-1,cy-1),fill=C('#86a446'))
def twigs(d): d.line((3,11,12,8),fill=C('#5e3c1c')); d.line((7,10,9,13),fill=C('#5e3c1c')); d.line((5,6,10,5),fill=C('#6e4626'))
def pot(d): d.ellipse((3,5,12,15),fill=C('#a8603a')); d.rectangle((5,3,10,6),fill=C('#8a4a2a')); d.rectangle((4,7,6,12),fill=C('#c47a4a')); d.line((3,10,12,10),fill=C('#7a4024'))
def crate(d): d.rectangle((2,4,13,15),fill=C('#8a5a2c')); d.rectangle((2,4,13,5),fill=C('#a8743c')); d.line((2,4,13,15),fill=C('#5e3c1c')); d.line((13,4,2,15),fill=C('#5e3c1c')); d.rectangle((2,4,13,15),outline=C('#5e3c1c'))
def stone(d): d.ellipse((3,8,12,15),fill=C('#958c7e')); d.ellipse((4,8,9,12),fill=C('#b8b0a2'))
def lantern(d): d.rectangle((7,6,8,15),fill=C('#3e2a18')); d.rectangle((5,1,10,6),fill=C('#2a1d16')); d.rectangle((6,2,9,5),fill=C('#ffd25a')); d.point((6,2),fill=C('#fff0b0')); d.rectangle((4,0,11,1),fill=C('#3e2a18'))
def post(d): d.rectangle((7,5,8,15),fill=C('#5e3c1c')); d.rectangle((2,3,13,7),fill=C('#8a5a2c')); d.line((3,5,11,5),fill=C('#5e3c1c')); d.polygon([(13,3),(15,5),(13,7)],fill=C('#8a5a2c'))
def lily(d): d.ellipse((3,6,12,12),fill=C('#5e8a3a')); d.polygon([(8,9),(12,7),(12,10)],fill=(0,0,0,0)); d.point((6,8),fill=C('#86a446')); d.point((9,7),fill=C('#e8b0c8')); d.point((10,7),fill=C('#ffffff'))
def stump1(d): d.ellipse((3,7,12,14),fill=C('#6e4626')); d.ellipse((3,5,12,11),fill=C('#b08a5a')); d.ellipse((5,7,10,9),outline=C('#8a6a3a'))
def snowball(d): d.ellipse((2,6,13,15),fill=C('#dfe6f0')); d.ellipse((3,6,9,11),fill=C('#ffffff')); d.line((4,14,11,14),fill=C('#b8c4d8'))
def ladder(d): 
    for x in (4,11): d.line((x,0,x,31),fill=C('#8a5a2c'))
    for y in range(3,31,5): d.line((4,y,11,y),fill=C('#a8743c'))
def board():
    im=canvas(48,16); d=ImageDraw.Draw(im)
    d.rectangle((4,9,6,15),fill=C('#5e3c1c')); d.rectangle((41,9,43,15),fill=C('#5e3c1c'))
    d.rectangle((1,1,46,11),fill=C('#8a5a2c')); d.rectangle((1,1,46,2),fill=C('#a8743c'))
    for i,x in enumerate((5,16,27,37)): d.rectangle((x,3,x+7,9),fill=C('#e8dcc0' if i%2 else '#d8c8a0')); d.point((x+3,3),fill=C('#c2412c'))
    for i,x in enumerate((5,16,27,37)):
        for yy in (5,7): d.line((x+1,yy,x+5,yy),fill=C('#8a7a60'))
    return outline(im)
def field():
    im=canvas(48,32); d=ImageDraw.Draw(im)
    d.rectangle((1,2,46,30),fill=C('#6e4e30'))
    for y in range(4,30,5):
        d.rectangle((2,y,45,y+2),fill=C('#5a3e24')); d.line((2,y,45,y),fill=C('#8a6440'))
        for x in range(4,45,5): d.line((x,y,x,y-2),fill=C('#5e8a3a')); d.point((x-1,y-2),fill=C('#86a446')); d.point((x+1,y-3),fill=C('#86a446'))
    return outline(im)
def cave():
    im=rockshape(48,48,(1,6,46,46),DSTONE); d=ImageDraw.Draw(im)
    d.ellipse((14,22,33,52),fill=C('#120c14')); d.ellipse((16,24,31,50),fill=C('#08060a'))
    for x in (15,32): d.line((x,30,x,46),fill=C('#30353a'))
    for i in range(14): d.point((int(4+40*hh(i,21)),int(8+10*hh(i,22))),fill=C('#6a8a36'))
    return im
def statue():
    im=canvas(32,32); d=ImageDraw.Draw(im)
    d.rectangle((6,24,25,30),fill=C('#6e665a')); d.rectangle((6,24,25,25),fill=C('#958c7e'))
    d.polygon([(11,24),(13,4),(18,4),(20,24)],fill=C('#8e8476')); d.polygon([(16,4),(18,4),(20,24),(16,24)],fill=C('#6e665a'))
    d.polygon([(13,4),(15.5,0),(18,4)],fill=C('#a8a090'))
    for y,ch in ((8,1),(12,1),(16,1),(20,1)): d.rectangle((14,y,16,y+1),fill=C('#5ac8e0')); d.point((15,y+2),fill=C('#3a90b0'))
    return outline(im)
def stairs():
    im=canvas(32,48); d=ImageDraw.Draw(im)
    d.rectangle((0,0,31,47),fill=C('#120c14'))
    for i,y in enumerate(range(40,2,-6)):
        c=sh(C('#7a7270'),1-i*0.11); d.rectangle((2,y,29,y+5),fill=c); d.line((2,y,29,y),fill=sh(c,1.25))
    d.rectangle((0,0,1,47),fill=C('#3a3438')); d.rectangle((30,0,31,47),fill=C('#3a3438'))
    return im
def igloo():
    im=canvas(32,48); d=ImageDraw.Draw(im); shade_ellipse(d,(1,14,30,46),('#ffffff','#e6eaf0','#c8d2e2','#a8b6cc'))
    for y in range(20,46,6): d.line((4,y,27,y),fill=C('#b8c4d8'))
    d.ellipse((10,30,21,48),fill=C('#1e2a3a'))
    return outline(im)
def dog():
    im=canvas(32,16); d=ImageDraw.Draw(im)
    for f in (0,1):
        ox=f*16; leg=1 if f else 0
        d.rectangle((ox+3,7,ox+11,11),fill=C('#a8743c')); d.rectangle((ox+3,10,ox+11,11),fill=C('#8a5a2c'))
        d.rectangle((ox+10,4,ox+14,8),fill=C('#a8743c')); d.point((ox+13,5),fill=C('#1e1712')); d.point((ox+14,7),fill=C('#1e1712')); d.rectangle((ox+10,3,ox+11,5),fill=C('#6e4626'))
        d.line((ox+2,6,ox+1,4+leg),fill=C('#a8743c'))
        for lx in (4,6,9,11): d.line((ox+lx,12,ox+lx+(leg if lx in (4,9) else -leg),14),fill=C('#6e4626'))
        d.point((ox+7,8),fill=C('#d8b080'))
    return outline(im)
PROPS={
 'houseO':lambda: building(64,48,'slate','stone','#4a5a6e','#a89a84','#5e3c1c',chimney=True,sign='#d4aa30'),
 'houseB':lambda: building(64,48,'slate','stone','#5a4e6e','#9a9286','#4a3a30',chimney=True),
 'houseC':lambda: building(64,48,'thatch','timber','#b08a4a','#e0d4b8','#5e3c1c',chimney=True),
 'dojo':  lambda: building(64,48,'tile','wood','#8e3a2a','#8a5a2c','#5e3c1c',sign='#c2412c'),
 'hut':   lambda: building(32,32,'thatch','wood','#b08a4a','#8a6a44','#5e3c1c',windows=1),
 'ruin':  lambda: building(48,48,'','',None,None,None,ruin=True),
 'ruin2': lambda: building(48,48,'','',None,None,None,ruin=True,overgrown=True),
 'rubble':lambda: building(48,32,'','',None,None,None,ruin=True),
 'stall': stall, 'torii': arch, 'board': board, 'field': field, 'cave': cave, 'statue': statue, 'stairs': stairs, 'igloo': igloo,
 'treeA': lambda: tree(32,32,[(16,11,9),(9,14,6.5),(23,14,6.5),(16,17,7)],OAK,(14,19,5,9)),
 'treeB': lambda: tree(32,32,[(16,10,8),(10,15,6),(22,15,6),(16,17,6)],BIRCH,(14,19,4,9),('#d8d0c0','#a8a090')),
 'bigbush':lambda: tree(48,48,[(24,18,13),(12,24,9),(36,24,9),(24,28,11)],OAK,(21,34,6,10)),
 'pine': lambda: pine(), 'snowtree': lambda: pine(snowy=True), 'snowpine': lambda: pine(32,48,True),
 'rock': lambda: rockshape(32,32,(2,8,30,30),STONE), 'boulder': lambda: rockshape(32,32,(2,6,30,30),DSTONE),
 'stump': lambda: small(lambda d:(d.ellipse((5,14,27,29),fill=C('#5e3c1c')),d.ellipse((5,10,27,24),fill=C('#b08a5a')),d.ellipse((9,13,23,21),outline=C('#8a6a3a')),d.ellipse((13,15,19,19),outline=C('#8a6a3a'))),32,32),
 'fence':lambda: small(fence),'flowers':lambda: small(flowers),'dots':lambda: small(dots),'tuft':lambda: small(tuft),'tuft2':lambda: small(tuft2),'clover':lambda: small(clover),
 'twigs':lambda: small(twigs),'pot':lambda: small(pot),'crate':lambda: small(crate),'stone':lambda: small(stone),'lantern':lambda: small(lantern),'post':lambda: small(post),
 'lily':lambda: small(lily),'stump1':lambda: small(stump1),'snowball':lambda: small(snowball),'ladder':lambda: small(ladder,16,32),
}
def build_atlas(out_png, out_json):
    items=[(k,f()) for k,f in PROPS.items()]
    # ground tiles first row
    W=16*16; x=0; y=0; rowh=16; placed={}
    atlas=Image.new('RGBA',(W,640),(0,0,0,0))
    for i,(k,t) in enumerate(GROUND.items()):
        atlas.alpha_composite(t,(i*16,0)); placed['g:'+k]=[i,0]
    y=16
    rowh=0; x=0
    for k,im in sorted(items,key=lambda kv:-kv[1].size[1]):
        w,h=im.size
        if x+w>W: x=0; y+=rowh; rowh=0
        atlas.alpha_composite(im,(x,y)); placed[k]=[x//16,y//16,w//16,h//16]
        x+=w; rowh=max(rowh,h)
    atlas=atlas.crop((0,0,W,y+rowh)); atlas.save(out_png); json.dump(placed,open(out_json,'w'))
    return atlas,placed
if __name__=='__main__':
    a,p=build_atlas('/tmp/art/env2.png','/tmp/art/env2.json'); print(a.size,len(p))
    dog().save('/tmp/art/dog2.png')
