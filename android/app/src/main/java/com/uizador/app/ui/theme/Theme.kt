package com.uizador.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val UizadorColors = darkColorScheme(
    primary = Color(0xFFFF79C6),
    onPrimary = Color(0xFF3A0825),
    secondary = Color(0xFFB9A5FF),
    tertiary = Color(0xFF55DDE0),
    background = Color(0xFF100B1C),
    onBackground = Color(0xFFF9F2FF),
    surface = Color(0xFF1A1329),
    onSurface = Color(0xFFF9F2FF),
    surfaceVariant = Color(0xFF2B203C),
    onSurfaceVariant = Color(0xFFD7CBE5),
)

@Composable
fun UizadorTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = UizadorColors,
        content = content,
    )
}
