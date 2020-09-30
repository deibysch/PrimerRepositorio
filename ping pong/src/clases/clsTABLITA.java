package clases;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class clsTABLITA extends Thread{
    
    Graphics pintor;
    Color fondo;
    public int Ancho,Alto,posXTsup, XTant, posXTinf,AlturaTinf, AlturaTsup, FormW, pot, pix;
    public Rectangle completaSup, completaInf;
    public boolean MenorqBorde;
    
    public clsTABLITA(int WF, int HF, Graphics pintor, Color fondo){
        this.pintor=pintor;
        this.fondo= fondo;
        this.Ancho=120;
        this.Alto=16;
        this.pix=10;
        this.posXTsup=(WF/2-Ancho/2)/pix*pix;
        this.XTant=0;
        this.posXTinf=(WF/2-Ancho/2)/pix*pix;
        this.AlturaTsup=92;//92 es la distancia de la tabla sup al borde
        this.AlturaTinf=(HF-12)/4*4;//94 es la distancia de la tabla inf al borde
        this.FormW=WF;
        this.pot=0;
        this.MenorqBorde=true;
        this.completaSup=new Rectangle(1,1,1,1);
    }
    
    public void DibujarSup() {
        this.pintor.setColor(Color.black);
        this.pintor.fillRoundRect(posXTsup, AlturaTsup, Ancho, Alto, 10, 10);
    }
    public void DibujarInf() {
        this.pintor.setColor(Color.black);
        this.pintor.fillRoundRect(posXTinf, AlturaTinf, Ancho, Alto, 10, 10);
    }
    
    public void BorrarSup() {
       this.pintor.setColor(fondo);
        this.pintor.fillRoundRect(posXTsup, AlturaTsup, Ancho, Alto, 10, 10);
    }
    public void BorrarInf() {
       this.pintor.setColor(fondo);
        this.pintor.fillRoundRect(posXTinf, AlturaTinf, Ancho, Alto, 10, 10);
    }
    
    public void esperar(){
        try {
            sleep(30);
        } catch (Exception e) {}
    }
    
    public void DerechaSup() {
        MenorqBorde=this.posXTsup<FormW/pix*pix-Ancho-70;
        if(MenorqBorde){//72 mide el borde negro
        this.BorrarSup();
        this.posXTsup+=pix;
        this.DibujarSup();
        }
    }
    
    public void DerechaInf() {
        MenorqBorde=this.posXTinf<FormW/pix*pix-Ancho-70;
        if(MenorqBorde){
        this.BorrarInf();
        this.posXTinf+=pix;
        this.DibujarInf();
        }
    }
    
    public void IzquierdaSup() {
        MenorqBorde=this.posXTsup>80;
        if(MenorqBorde){//72 mide el borde negro
            this.BorrarSup();
            this.posXTsup-=pix;
            this.DibujarSup();
        }
    }
    
    public void IzquierdaInf() {
        MenorqBorde=this.posXTinf>80;
        if(MenorqBorde){
            this.BorrarInf();
            this.posXTinf-=pix;
            this.DibujarInf();
        }
    }
}
