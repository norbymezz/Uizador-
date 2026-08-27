package com.uizador.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.uizador.app.ui.UizadorApp
import com.uizador.app.ui.theme.UizadorTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            UizadorTheme {
                UizadorApp()
            }
        }
    }
}
