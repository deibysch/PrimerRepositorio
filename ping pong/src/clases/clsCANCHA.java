package clases;

import java.applet.AudioClip;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Rectangle;
import javax.swing.JLabel;

public class clsCANCHA extends Thread{
    private Graphics pintor1;
    private Color fondo;
    private clsTABLITA T;
    private clsPELOTA P;
    private clsObstaculo O;
    private clsLADRILLOS L;
    private clsCuentaAtras CuentaAtras;
    private int BordeIzq, BordeDer, AlturaTsup, AlturaTinf, puntuacion, vida, WF, HF;
    private boolean Jugar, unoVS;
    private JLabel puntuaccion, vidda;
    public AudioClip efectto;
    
    public clsCANCHA(boolean unoVS, int WF, int HF, int velocidad, JLabel punt, JLabel vid, Color fondo, Graphics pintor1, Graphics pintor2,Graphics pintor3, Graphics pintor4){
        this.pintor1=pintor1;
        this.fondo=fondo;
        T=new clsTABLITA(WF, HF, pintor1, fondo);
        P=new clsPELOTA(WF, HF, velocidad, pintor2, fondo);
        O = new clsObstaculo(HF, WF, pintor3, fondo);
        L=new clsLADRILLOS(WF, HF, pintor4,fondo);
        CuentaAtras= new clsCuentaAtras(WF, O.posY, pintor4, fondo);
        this.pintor1.setFont(new Font("", Font.BOLD, 30));
        this.unoVS=unoVS;
        this.WF=WF;
        this.HF=HF;
        this.vidda=vid;
        this.puntuaccion=punt;
        BordeIzq=72;//48 es el borde negro
        BordeDer=WF/4*4;
        AlturaTsup=52;
        AlturaTinf=HF;
        vida=3;
        puntuacion=0;
        efectto=java.applet.Applet.newAudioClip(getClass().getResource("/efecto-agua.wav/"));
    }
    
    public void MIzquierdaTablaSup(){
        if(unoVS)
            T.IzquierdaSup();
   }
    
    public void MDerechaTablitaSup() {
        if(unoVS)
            T.DerechaSup();
    }
    
    public void MIzquierdaTablaInf(){
        T.IzquierdaInf();
    }
    
    public void MDerechaTablitaInf() {
        T.DerechaInf();
    }
    
    public void IniciarJuego(){
        Reiniciarjuego();
            T.DibujarInf();
        if(unoVS){
            T.DibujarSup();
            O.Dibujar();
        }
    }
    
    public void IniciarPelota(){
        Jugar=true;
        O.seguir=true;
        new Thread(this).start();
        P.dibujar(P.velocidad);
        new Thread(CuentaAtras).start();
    }
    
    public void pausarjuego(){
        this.Jugar=false;
        O.seguir=false;
        P.esperar(70);
        P.dibujar(P.velocidad);
        if(unoVS)
            O.Dibujar();
    }
    
    public void Reiniciarjuego(){
        pausarjuego();
        PintarWin_Over(fondo, "Game Over");
        P.borrar();
        P.posX=(WF/2-P.tam/2)/4*4;
        P.posY=(HF-12)/4*4-P.tam;
        P.SRx=0;
        P.SRy=-4;
        P.mul=-1;
        P.grados=4;
        T.BorrarInf();
        T.posXTinf=(WF/2-T.Ancho/2)/10*10;
        T.DibujarInf();
        if(unoVS){
            T.BorrarSup();
            T.posXTsup=(WF/2-T.Ancho/2)/10*10;
            T.DibujarSup();
            O.Borrar();
            O.posX=(WF/2-O.Ancho/2)/10*10;
            O.Dibujar();
        }
        else
            L.PintarTodo();
        vida=3;
        vidda.setText(vida+"");
        puntuacion=0;
        puntuaccion.setText(puntuacion+"");
        IniciarPelota();
    }
    
    private boolean EstáCercadeTablaSup(){
        return P.posY==T.AlturaTsup+T.Alto+24;
    } 

    private boolean EstáCercadeTablainf(){
        return P.posY==T.AlturaTinf-P.tam-24;
    }

    private boolean EstáCercadeObstaculo(){
        return (P.posY==O.posY-P.tam-8)||(P.posY==O.posY+O.Alto+8);
    }
    
    private boolean ChocóLados(){
        return (P.posX==BordeIzq)||(P.posX<=BordeIzq+2)||(P.posX==BordeDer-P.tam-72)||(P.posX>=BordeDer-P.tam-72-2);
    }
                
    private void CalcularDireccionT_AnivelarP(){
        P.grados=8-P.grados;
        if(P.SRy<0){
            P.posY=T.AlturaTsup+T.Alto;
            P.mul=1;
            if(T.XTant>T.posXTsup)
                if(P.grados-2>0)
                    P.grados-=2;
                else
                    P.grados=1;
            else if(T.XTant<T.posXTsup)
                if(P.grados+2<8)
                    P.grados+=2;
                else
                    P.grados=7;
        }
        else{
            P.posY=T.AlturaTinf-P.tam;
            P.mul=-1;
            if(T.XTant>T.posXTinf)
                if(P.grados+2<8)
                    P.grados+=2;
                else
                    P.grados=7;
            else if(T.XTant<T.posXTinf)
                if(P.grados-2>0)
                    P.grados-=2;
                else
                    P.grados=1;
        }
    }

    private void CalculardireccionO_AnivelarP(){
        P.grados=8-P.grados;
        if(P.SRy<0){
            P.posY=O.posY+O.Alto;
            P.mul=1;
            if(O.Xant>O.posX)//a izquie
                if(P.grados-3>0)
                    P.grados-=3;
                else
                    P.grados=1;
            else if(O.Xant<O.posX)//a derec
                if(P.grados+3<8)
                    P.grados+=3;
                else
                    P.grados=7;
        }
        else{
            P.posY=O.posY-P.tam;
            P.mul=-1;
            if(O.Xant>O.posX)//a izquie
                if(P.grados+3<8)
                    P.grados+=3;
                else
                    P.grados=7;
            else if(O.Xant<O.posX)//a derec
                if(P.grados>3)
                    P.grados-=3;
                else
                    P.grados=1;
        }
    }
    
    private void VerSiIntersectaDerOIzqDePelota(){
        P.izq=new Rectangle(P.posX, P.posY+4, P.tam/2, P.tam-8);
        P.der=new Rectangle(P.posX+P.tam/2, P.posY+4, P.tam/2, P.tam-8);
        if(P.izq.intersects(T.completaInf)||P.izq.intersects(T.completaSup)){
            P.grados=8-P.grados;
            P.posX+=16;
        }
        else if(P.der.intersects(T.completaInf)||P.der.intersects(T.completaSup)){
            P.grados=8-P.grados;
            P.posX-=16;
        }
        else
            CalcularDireccionT_AnivelarP();
    }
    
    public boolean LadrilloesVisibleYhaChocado(int i){
       return L.visib[i][0]==1&&P.completa.intersects(L.chocador[i]);
    }
    
    public void VerSiIntersectoConArribaoAbajoDePelota(int i){
        P.inf=new Rectangle(P.posX+4, P.posY+P.tam/2, P.tam-8, P.tam/2);
        P.sup=new Rectangle(P.posX+4, P.posY, P.tam-8, P.tam/2);
        if(L.chocador[i].intersects(P.sup))
            P.mul=1;
        else if(L.chocador[i].intersects(P.inf))
            P.mul=-1;
        P.grados=8-P.grados;
    }
    
    @Override
    
    public void run(){ 
        P.esperar(4000);
        P.borrar();
        O.Borrar();
        if(unoVS)
            new Thread(O).start();
        while((Jugar)&&(vida>0)){
            while((P.posY>AlturaTsup)&&(P.posY<AlturaTinf)&&(Jugar))
            {
                P.posX+=P.SRx;
                P.posY+=P.SRy;
                P.dibujar(P.velocidad);
                P.borrar();
                P.completa=new Rectangle(P.posX, P.posY, P.tam, P.tam);
                T.completaInf=new Rectangle(T.posXTinf, T.AlturaTinf-1, T.Ancho, T.Alto);
                
                if(EstáCercadeTablainf()){
                    T.XTant=T.posXTinf;
                    P.esperar(10);
                }
                else if(P.completa.intersects(T.completaInf)){
                    efectto.play();
                    VerSiIntersectaDerOIzqDePelota();
                    P.DarGradoDeRebote();
                }
                else if(ChocóLados()){
                    efectto.play();
                    P.grados=8-P.grados;
                    P.DarGradoDeRebote();
                }
                if(unoVS){
                    T.completaSup=new Rectangle(T.posXTsup, T.AlturaTsup+1, T.Ancho, T.Alto);
                    O.completo=new Rectangle(O.posX-6, O.posY-1, O.Ancho+12, O.Alto+2);
                    if(EstáCercadeTablaSup()){
                        T.XTant=T.posXTsup;
                    }
                    else if(EstáCercadeObstaculo()){
                        O.Xant=O.posX;
                    }
                    else if(P.completa.intersects(O.completo)) {
                        efectto.play();
                        CalculardireccionO_AnivelarP();
                        P.DarGradoDeRebote();
                    }
                    else if(P.completa.intersects(T.completaSup)){
                        efectto.play();
                        VerSiIntersectaDerOIzqDePelota();
                        P.DarGradoDeRebote();
                    }
                }
                else if(P.posY<HF/2.5){
                    for (byte i = 1; i < 19; i++) {
                        if(LadrilloesVisibleYhaChocado(i)){
                            efectto.play();
                            puntuacion++;
                            puntuaccion.setText(puntuacion+"");
                            VerSiIntersectoConArribaoAbajoDePelota(i);
                            P.DarGradoDeRebote();
                            L.visib[i][0]=0;
                            L.Borrar(i);
                        }
                        if(puntuacion==18){
                            PintarWin_Over(Color.WHITE, "  You Win");
                            Jugar=false;
                        }
                    }
                }
            }
            if(Jugar){
                boolean cayo=true;
                if((unoVS==false)&&(P.posY<=AlturaTsup+8)){
                    efectto.play();
                    P.mul=1;
                    P.grados=8-P.grados;
                    P.posY=AlturaTsup+P.pixel;
                    P.DarGradoDeRebote();
                    cayo=false;
                }
                if(cayo){
                    this.vida--;
                    vidda.setText(vida+"");
                    P.borrar();
                    if(vida==0){
                        O.seguir=false;
                        P.esperar(100);
                        O.Borrar();
                        PintarWin_Over(Color.WHITE, "Game Over");
                    }
                    else{
                        new Thread(CuentaAtras).start();
                        P.esperar(4000);
                        P.posX=(WF/2-P.tam/2)/4*4;
                        P.posY=(HF-12)/4*4-P.tam;
                        P.SRx=0;
                        P.SRy=-4;
                        P.grados=4;
                        P.mul=-1;
                    }
                }
            }
        }
    }
    
    private void PintarWin_Over(Color color, String texto){
        this.pintor1.setFont(new Font("", Font.BOLD, 50));
        pintor1.setColor(color);
        pintor1.drawString(texto, (WF-280)/2, HF/2);
    }
    
    public void borrarPel_Tab_Obs(){
        this.Jugar=false;
        O.seguir=false;
        P.esperar(50);
        L.BorrarTodo();
        PintarWin_Over(fondo, "Game Over");
        P.borrar();
        T.BorrarInf();
        T.BorrarSup();
        O.Borrar();
    }
}
