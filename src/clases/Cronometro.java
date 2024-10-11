package clases;
public class Cronometro extends Thread{
    public int seg;
    public boolean contar;
    public Cronometro(){
        seg=0;
        contar=true;
    }
    
    public void DarPotenciaTab(int i){
        /*contar=false;
        try { sleep(10); } catch (Exception e) {}
        if(seg<6)
            T.pot++;
        else
            T.pot=0;
        vidda.setText(T.pot+"");
        seg=0;
        contar=true;
        new Thread(this).start();*/
    }
    
    @Override
    public void run(){
        while(contar){
            try {
                sleep(100);
            } catch (Exception e) {}
            seg++;
        }
    }
}
