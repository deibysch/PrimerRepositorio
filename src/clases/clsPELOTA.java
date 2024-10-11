package clases;
import java.awt.Graphics;
import java.awt.Color;
import java.awt.Rectangle;

public class clsPELOTA {
    
    Graphics pintor;
    Color fondo;
    public int posX, posY, SRx, SRy, tam, velocidad, pixel, grados, mul;
    public Rectangle completa, sup, inf, izq, der;
    
    public clsPELOTA(int WF, int HF, int velocidad, Graphics pintor, Color fondo){
        this.pintor=pintor;
        this.fondo= fondo;
        this.tam=32;
        this.posX=(WF/2-15)/4*4;
        this.posY=(HF-12)/4*4-tam;
        this.SRx=0;
        this.SRy=-4;
        this.velocidad=velocidad;
        this.pixel=4;
        this.grados=4;
        this.mul=-1;
    }
    
    public void esperar (int MS){
        try { Thread.sleep(MS);} 
        catch (Exception e){}
    }
    
    public void dibujar(int N){
        this.pintor.setColor(Color.WHITE);
        this.pintor.fillOval(this.posX,this.posY, this.tam, this.tam);
        this.esperar(N);
    }
    
    public void borrar(){
        this.pintor.setColor(fondo);
        this.pintor.fillOval(this.posX,this.posY, this.tam, this.tam);
    }   
    
    public void DarGradoDeRebote(){
        if(grados==1){
        SRx=-4*mul;
        SRy=2*mul;
        }
        else if(grados==2){
        SRx=-4*mul;
        SRy=4*mul;
        }
        else if(grados==3){
        SRx=-2*mul;
        SRy=4*mul;
        }
        else if(grados==4){
        SRx=0*mul;
        SRy=4*mul;
        }
        else if(grados==5){
        SRx=2*mul;
        SRy=4*mul;
        }
        else if(grados==6){
        SRx=4*mul;
        SRy=4*mul;
        }
        else if(grados==7){
        SRx=4*mul;
        SRy=2*mul;
        }
    }
}
