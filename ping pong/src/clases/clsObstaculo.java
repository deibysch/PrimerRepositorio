package clases;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class clsObstaculo extends Thread{
    public Graphics pintor;
    private Color fondo;
    public int posX, Xant, posY,Ancho,Alto,pixel, FormW;
    public Rectangle completo;
    public boolean seguir=true;
    
    public clsObstaculo(int HF, int WF, Graphics pintor, Color fondo){
        this.pintor=pintor;
        this.fondo=fondo;
        Ancho=150;
        Alto=8;
        posX=(WF/2-Ancho/2)/4*4;
        Xant=posX;
        posY=(HF/2+52)/4*4;
        FormW=WF;
        pixel=4;
    }
    
    public void Dibujar() {
        this.pintor.setColor(Color.black);
        this.pintor.fillRect(posX, posY, Ancho, Alto);
    }
    
    public void Borrar() {
        this.pintor.setColor(fondo);
        this.pintor.fillRect(posX, posY, Ancho, Alto);
    }
    
    @Override
    public void run(){
        while(seguir){
            if((this.posX>100)&&(this.posX<FormW/4*4-100-this.Ancho)){//100 es por gusto 
                this.posX+=this.pixel;
                Dibujar();
                try {
                    sleep(20);
                } catch (Exception e) {}
                this.Borrar();
            }
            if(posX<=100){
                pixel=10;
                posX+=pixel;
            }
            else if(posX>=FormW/4*4-100-this.Ancho){
                posX-=pixel;
                pixel=-10;
            }
        }
        Dibujar();
    }
}
