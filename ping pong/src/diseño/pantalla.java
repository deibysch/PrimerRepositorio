package diseño;
import clases.clsCANCHA;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

public class pantalla extends javax.swing.JFrame {
    
    private Graphics pintor1, pintor2, pintor3, pintor4;
    private clsCANCHA objCANCHA;
    private int velocidad;
    private boolean unoVS;
    public pantalla() {
        initComponents();
        this.pintor1=getGraphics();
        this.pintor2=getGraphics();
        this.pintor3=getGraphics();
        this.pintor4=getGraphics();
        velocidad=24;
        btNormal.setVisible(false);
        txtRapido.setVisible(false);
        txtDespacio.setVisible(false);
        unoVSuno.setVisible(false);
        Campaña.setVisible(false);
        txtOpciones.setVisible(false);
    }
    
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jMenuBar2 = new javax.swing.JMenuBar();
        jMenu3 = new javax.swing.JMenu();
        jMenu4 = new javax.swing.JMenu();
        jMenuItem1 = new javax.swing.JMenuItem();
        jRadioButtonMenuItem1 = new javax.swing.JRadioButtonMenuItem();
        jRadioButtonMenuItem2 = new javax.swing.JRadioButtonMenuItem();
        jCheckBoxMenuItem1 = new javax.swing.JCheckBoxMenuItem();
        jLabel1 = new javax.swing.JLabel();
        panelFondo = new javax.swing.JPanel();
        PaneLim = new javax.swing.JPanel();
        txtNivel = new javax.swing.JLabel();
        txtIniciar = new javax.swing.JLabel();
        txtsalir = new javax.swing.JLabel();
        txtMas = new javax.swing.JLabel();
        btNormal = new javax.swing.JLabel();
        txtDespacio = new javax.swing.JLabel();
        txtRapido = new javax.swing.JLabel();
        unoVSuno = new javax.swing.JLabel();
        Campaña = new javax.swing.JLabel();
        vidda = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        puntto = new javax.swing.JLabel();
        jMenuBar1 = new javax.swing.JMenuBar();
        txtOpciones = new javax.swing.JMenu();
        txtPausar_continuar = new javax.swing.JMenuItem();
        txtReiniciar = new javax.swing.JMenuItem();
        txtMenu = new javax.swing.JMenuItem();

        jMenu3.setText("File");
        jMenuBar2.add(jMenu3);

        jMenu4.setText("Edit");
        jMenuBar2.add(jMenu4);

        jMenuItem1.setText("jMenuItem1");

        jRadioButtonMenuItem1.setSelected(true);
        jRadioButtonMenuItem1.setText("jRadioButtonMenuItem1");

        jRadioButtonMenuItem2.setSelected(true);
        jRadioButtonMenuItem2.setText("jRadioButtonMenuItem2");

        jCheckBoxMenuItem1.setSelected(true);
        jCheckBoxMenuItem1.setText("jCheckBoxMenuItem1");

        jLabel1.setText("jLabel1");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyPressed(java.awt.event.KeyEvent evt) {
                formKeyPressed(evt);
            }
        });

        panelFondo.setBackground(new java.awt.Color(0, 0, 0));
        panelFondo.setPreferredSize(new java.awt.Dimension(11005, 480));

        PaneLim.setBackground(new java.awt.Color(153, 153, 153));
        PaneLim.setInheritsPopupMenu(true);
        PaneLim.setPreferredSize(new java.awt.Dimension(0, 45));

        txtNivel.setBackground(new java.awt.Color(0, 51, 204));
        txtNivel.setFont(new java.awt.Font("Broadway", 1, 48)); // NOI18N
        txtNivel.setText("  Nivel ");
        txtNivel.setToolTipText("");
        txtNivel.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtNivel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtNivelMouseClicked(evt);
            }
        });

        txtIniciar.setBackground(new java.awt.Color(0, 51, 204));
        txtIniciar.setFont(new java.awt.Font("Broadway", 1, 48)); // NOI18N
        txtIniciar.setText("     Iniciar");
        txtIniciar.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtIniciar.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtIniciarMouseClicked(evt);
            }
        });

        txtsalir.setBackground(new java.awt.Color(0, 51, 204));
        txtsalir.setFont(new java.awt.Font("Broadway", 1, 48)); // NOI18N
        txtsalir.setText(" Salir");
        txtsalir.setToolTipText("");
        txtsalir.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtsalir.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtsalirMouseClicked(evt);
            }
        });

        txtMas.setBackground(new java.awt.Color(0, 51, 204));
        txtMas.setFont(new java.awt.Font("Broadway", 1, 48)); // NOI18N
        txtMas.setText("        Mas");
        txtMas.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtMas.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtMasMouseClicked(evt);
            }
        });

        btNormal.setBackground(new java.awt.Color(0, 51, 204));
        btNormal.setFont(new java.awt.Font("Broadway", 1, 14)); // NOI18N
        btNormal.setText(" Normal");
        btNormal.setToolTipText("");
        btNormal.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        btNormal.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btNormalMouseClicked(evt);
            }
        });

        txtDespacio.setBackground(new java.awt.Color(0, 51, 204));
        txtDespacio.setFont(new java.awt.Font("Broadway", 1, 14)); // NOI18N
        txtDespacio.setText(" Despacio");
        txtDespacio.setToolTipText("");
        txtDespacio.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtDespacio.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtDespacioMouseClicked(evt);
            }
        });

        txtRapido.setBackground(new java.awt.Color(0, 51, 204));
        txtRapido.setFont(new java.awt.Font("Broadway", 1, 14)); // NOI18N
        txtRapido.setText(" Rapido");
        txtRapido.setToolTipText("");
        txtRapido.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        txtRapido.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                txtRapidoMouseClicked(evt);
            }
        });

        unoVSuno.setBackground(new java.awt.Color(0, 51, 204));
        unoVSuno.setFont(new java.awt.Font("Broadway", 1, 14)); // NOI18N
        unoVSuno.setText("uno vs uno");
        unoVSuno.setToolTipText("");
        unoVSuno.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        unoVSuno.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                unoVSunoMouseClicked(evt);
            }
        });

        Campaña.setBackground(new java.awt.Color(0, 51, 204));
        Campaña.setFont(new java.awt.Font("Broadway", 1, 14)); // NOI18N
        Campaña.setText("Campaña");
        Campaña.setToolTipText("");
        Campaña.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        Campaña.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                CampañaMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout PaneLimLayout = new javax.swing.GroupLayout(PaneLim);
        PaneLim.setLayout(PaneLimLayout);
        PaneLimLayout.setHorizontalGroup(
            PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(PaneLimLayout.createSequentialGroup()
                .addContainerGap(99, Short.MAX_VALUE)
                .addGroup(PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtIniciar, javax.swing.GroupLayout.PREFERRED_SIZE, 337, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(PaneLimLayout.createSequentialGroup()
                        .addGap(67, 67, 67)
                        .addGroup(PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(txtNivel, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 201, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(PaneLimLayout.createSequentialGroup()
                                .addComponent(txtsalir, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18))))
                    .addGroup(PaneLimLayout.createSequentialGroup()
                        .addComponent(txtDespacio, javax.swing.GroupLayout.PREFERRED_SIZE, 86, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(53, 53, 53)
                        .addComponent(btNormal, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(53, 53, 53)
                        .addComponent(txtRapido, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(txtMas, javax.swing.GroupLayout.PREFERRED_SIZE, 336, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(PaneLimLayout.createSequentialGroup()
                        .addGap(59, 59, 59)
                        .addComponent(unoVSuno)
                        .addGap(57, 57, 57)
                        .addComponent(Campaña)))
                .addContainerGap(100, Short.MAX_VALUE))
        );
        PaneLimLayout.setVerticalGroup(
            PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(PaneLimLayout.createSequentialGroup()
                .addContainerGap(85, Short.MAX_VALUE)
                .addGroup(PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(unoVSuno)
                    .addComponent(Campaña))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(txtIniciar, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(27, 27, 27)
                .addComponent(txtNivel, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(txtMas, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(PaneLimLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtDespacio)
                    .addComponent(btNormal)
                    .addComponent(txtRapido))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(txtsalir, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(86, Short.MAX_VALUE))
        );

        txtMas.getAccessibleContext().setAccessibleName("  Mas");
        unoVSuno.getAccessibleContext().setAccessibleName("unoVSuno");

        vidda.setFont(new java.awt.Font("Broadway", 0, 24)); // NOI18N
        vidda.setForeground(new java.awt.Color(255, 255, 255));
        vidda.setText("3");

        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setText("Vidas");

        jLabel4.setForeground(new java.awt.Color(255, 255, 255));
        jLabel4.setText("Puntos");

        puntto.setBackground(new java.awt.Color(0, 0, 0));
        puntto.setFont(new java.awt.Font("Broadway", 0, 24)); // NOI18N
        puntto.setForeground(new java.awt.Color(255, 255, 255));
        puntto.setText("0");

        javax.swing.GroupLayout panelFondoLayout = new javax.swing.GroupLayout(panelFondo);
        panelFondo.setLayout(panelFondoLayout);
        panelFondoLayout.setHorizontalGroup(
            panelFondoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(panelFondoLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(panelFondoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel5)
                    .addGroup(panelFondoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                        .addComponent(jLabel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(puntto, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(vidda))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(PaneLim, javax.swing.GroupLayout.DEFAULT_SIZE, 537, Short.MAX_VALUE)
                .addGap(55, 55, 55))
        );
        panelFondoLayout.setVerticalGroup(
            panelFondoLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(PaneLim, javax.swing.GroupLayout.DEFAULT_SIZE, 476, Short.MAX_VALUE)
            .addGroup(panelFondoLayout.createSequentialGroup()
                .addGap(101, 101, 101)
                .addComponent(vidda)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel5)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(puntto)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel4)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jLabel4.getAccessibleContext().setAccessibleDescription("");
        puntto.getAccessibleContext().setAccessibleDescription("");

        jMenuBar1.setBackground(new java.awt.Color(255, 255, 255));
        jMenuBar1.setPreferredSize(new java.awt.Dimension(159, 20));

        txtOpciones.setBackground(new java.awt.Color(255, 255, 255));
        txtOpciones.setText("Opciones");

        txtPausar_continuar.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_SPACE, 0));
        txtPausar_continuar.setText("continuar");
        txtPausar_continuar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtPausar_continuarActionPerformed(evt);
            }
        });
        txtOpciones.add(txtPausar_continuar);

        txtReiniciar.setText("reiniciar");
        txtReiniciar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtReiniciarActionPerformed(evt);
            }
        });
        txtOpciones.add(txtReiniciar);

        txtMenu.setText("menu");
        txtMenu.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtMenuActionPerformed(evt);
            }
        });
        txtOpciones.add(txtMenu);

        jMenuBar1.add(txtOpciones);

        setJMenuBar(jMenuBar1);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(panelFondo, javax.swing.GroupLayout.DEFAULT_SIZE, 639, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(panelFondo, javax.swing.GroupLayout.DEFAULT_SIZE, 476, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void visibilidadMenu(boolean mostrar){
        txtIniciar.setVisible(mostrar);
        txtNivel.setVisible(mostrar);
        txtMas.setVisible(mostrar);
        txtsalir.setVisible(mostrar);
    }
    
    private void visibilidadVelocidades(boolean mostrar){
        btNormal.setVisible(mostrar);
        txtRapido.setVisible(mostrar);
        txtDespacio.setVisible(mostrar);
    }
    
    private void empezarJuego(){
        int ancho=getSize().width, alto=PaneLim.getSize().height;
        objCANCHA=new clsCANCHA(unoVS, ancho, alto,  velocidad, puntto, vidda, PaneLim.getBackground(), pintor1, pintor2, pintor3, pintor4);
        txtPausar_continuar.setText("pausar");
        txtOpciones.setVisible(true);
        visibilidadMenu(false);
        objCANCHA.IniciarJuego();
    }
    
    private void formKeyPressed(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_formKeyPressed
        int cod=evt.getKeyCode();
        if(cod==65)
            this.objCANCHA.MIzquierdaTablaSup();
        else if(cod==68)
            this.objCANCHA.MDerechaTablitaSup();
        if(cod==37)
            this.objCANCHA.MIzquierdaTablaInf();
        else if(cod==39)
            this.objCANCHA.MDerechaTablitaInf();
    }//GEN-LAST:event_formKeyPressed

    //boton que pausa o continua el juego
    private void txtPausar_continuarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtPausar_continuarActionPerformed
        if(txtPausar_continuar.getText()=="continuar"){
            objCANCHA.IniciarPelota();
            txtPausar_continuar.setText("pausar");
        }
        else{
            objCANCHA.pausarjuego();
            txtPausar_continuar.setText("continuar");
        }
    }//GEN-LAST:event_txtPausar_continuarActionPerformed

    private void txtReiniciarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtReiniciarActionPerformed
        txtPausar_continuar.setText("pausar");
        objCANCHA.Reiniciarjuego();
    }//GEN-LAST:event_txtReiniciarActionPerformed

    private void txtMenuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtMenuActionPerformed
        objCANCHA.borrarPel_Tab_Obs();
        visibilidadMenu(true);
        txtOpciones.setVisible(false);
    }//GEN-LAST:event_txtMenuActionPerformed

    private void txtNivelMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtNivelMouseClicked
        visibilidadMenu(false);
        txtNivel.setVisible(true);
        visibilidadVelocidades(true);
        
    }//GEN-LAST:event_txtNivelMouseClicked

    private void txtIniciarMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtIniciarMouseClicked
        visibilidadMenu(false);
        unoVSuno.setVisible(true);
        Campaña.setVisible(true);
    }//GEN-LAST:event_txtIniciarMouseClicked

    private void txtMasMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtMasMouseClicked
        if(txtMas.getText()=="        Mas") {
            visibilidadMenu(false);
            txtMas.setText("    Volver ");
            txtMas.setVisible(true);
            pintor1.setFont(new Font("", Font.BOLD, 35));
            pintor1.setColor(Color.BLACK);
            pintor1.drawString("Creditos A:", (getSize().width-200)/2, getSize().height-66);
            pintor1.setFont(new Font("", Font.BOLD, 20));
            pintor1.drawString("1. Pedro Deiby Sejas Churco",(getSize().width-300)/2,getSize().height-43);
            pintor1.drawString("2. Ing. Gustavo Tantani Mamani", (getSize().width-300)/2, getSize().height-20);
        }
        else{
            visibilidadMenu(true);
            txtMas.setText("        Mas");
            pintor1.setColor(Color.CYAN);
            pintor1.fillRect((getSize().width-300)/2, getSize().height-99, 300, 110);
            
        }
            
    }//GEN-LAST:event_txtMasMouseClicked

    private void txtsalirMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtsalirMouseClicked
        dispose();
    }//GEN-LAST:event_txtsalirMouseClicked

    private void btNormalMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btNormalMouseClicked
        this.velocidad=16;
        visibilidadMenu(true);
        visibilidadVelocidades(false);
    }//GEN-LAST:event_btNormalMouseClicked

    private void txtDespacioMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtDespacioMouseClicked
        this.velocidad=24;
        visibilidadMenu(true);
        visibilidadVelocidades(false);
    }//GEN-LAST:event_txtDespacioMouseClicked

    private void txtRapidoMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_txtRapidoMouseClicked
        this.velocidad=8;
        visibilidadMenu(true);
        visibilidadVelocidades(false);
    }//GEN-LAST:event_txtRapidoMouseClicked

    private void unoVSunoMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_unoVSunoMouseClicked
        unoVS=true;
        unoVSuno.setVisible(false);
        Campaña.setVisible(false);
        empezarJuego();
    }//GEN-LAST:event_unoVSunoMouseClicked

    private void CampañaMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_CampañaMouseClicked
        unoVS=false;
        unoVSuno.setVisible(false);
        Campaña.setVisible(false);
        empezarJuego();
    }//GEN-LAST:event_CampañaMouseClicked

    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new pantalla().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    public javax.swing.JLabel Campaña;
    private javax.swing.JPanel PaneLim;
    public javax.swing.JLabel btNormal;
    private javax.swing.JCheckBoxMenuItem jCheckBoxMenuItem1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JMenu jMenu3;
    private javax.swing.JMenu jMenu4;
    private javax.swing.JMenuBar jMenuBar1;
    private javax.swing.JMenuBar jMenuBar2;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JRadioButtonMenuItem jRadioButtonMenuItem1;
    private javax.swing.JRadioButtonMenuItem jRadioButtonMenuItem2;
    private javax.swing.JPanel panelFondo;
    private javax.swing.JLabel puntto;
    public javax.swing.JLabel txtDespacio;
    public javax.swing.JLabel txtIniciar;
    public javax.swing.JLabel txtMas;
    private javax.swing.JMenuItem txtMenu;
    public javax.swing.JLabel txtNivel;
    private javax.swing.JMenu txtOpciones;
    private javax.swing.JMenuItem txtPausar_continuar;
    public javax.swing.JLabel txtRapido;
    private javax.swing.JMenuItem txtReiniciar;
    public javax.swing.JLabel txtsalir;
    public javax.swing.JLabel unoVSuno;
    private javax.swing.JLabel vidda;
    // End of variables declaration//GEN-END:variables
}
