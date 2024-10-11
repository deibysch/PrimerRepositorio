package clases;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class clsLADRILLOS {
    public Graphics pintor;
    private Color fondo;
    public int WF, HF, x, y, ancho, alto;
    public int[][] visib;
    public Rectangle[] chocador;
    
    public clsLADRILLOS(int WF,int HF, Graphics pintor, Color fondo){
        this.pintor=pintor;
        this.fondo=fondo;
        this.WF=WF;
        this.HF=HF;
        this.ancho=100;
        this.alto=28;
        this.x=(WF-612)/4*4/2;
        this.y=150;
        this.visib=new int[19][5];
        this.chocador=new Rectangle[19];
    }
    public void PintarTodo(){
        darLugaryTamaño();
        for(byte i=1;i<19;i++){
            Dibujar(i);
        }
    }
    
    public void BorrarTodo(){
        darLugaryTamaño();
        for(byte i=1;i<19;i++){
            Borrar(i);
        }
    }
    public void Dibujar(byte n) {
        this.pintor.setColor(Color.black);
        this.pintor.fillRect(visib[n][1],visib[n][2],ancho, alto);
    }
    
    public void Borrar(byte n) {
       this.pintor.setColor(fondo);
        this.pintor.fillRect(visib[n][1],visib[n][2],ancho, alto);
    }
    
    public void darLugaryTamaño(){
        int L=1, j=0;
        while(j<3){
            for(int i=0;i<6;i++){
                visib[L]=new int[]{1, x+(ancho+4)*i, y+(alto+8)*j, ancho, alto};
                chocador[L]=new Rectangle(visib[L][1], visib[L][2], ancho, alto);
                L++;
            }
            j++;
        }
    }
}
