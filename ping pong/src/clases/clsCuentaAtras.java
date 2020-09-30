package clases;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

public class clsCuentaAtras extends Thread{
    public Graphics pintor;
    private Color fondo;
    public int WF, Obs;
    public clsCuentaAtras(int WF,int Obs, Graphics pintor, Color fondo){
        this.WF=WF;
        this.Obs=Obs;
        this.pintor=pintor;
        this.fondo=fondo;
    }
    
    public void run(){
        byte i=3;
        try {
            sleep(500);
        } catch (Exception e) {}
        while(i>=0){
            this.pintor.setFont(new Font("", Font.BOLD, 80));
            pintor.setColor(Color.WHITE);
            pintor.drawString(""+i, WF/2-25, Obs-5);
            try {
                sleep(1000);
            } catch (Exception e) {}
            this.pintor.setFont(new Font("", Font.BOLD, 80));
            pintor.setColor(fondo);
            pintor.drawString(""+i, WF/2-25, Obs-5);
            i--;
        }
    }
}
