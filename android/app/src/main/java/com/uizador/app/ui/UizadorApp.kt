package com.uizador.app.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private enum class Destination(val label: String, val emoji: String) {
    Create("Crear", "✦"),
    Record("Grabar", "●"),
    Projects("Proyectos", "▣"),
    Settings("Ajustes", "⚙"),
}

private data class Action(
    val emoji: String,
    val title: String,
    val subtitle: String,
    val destination: Destination,
)

@Composable
fun UizadorApp() {
    var selected by remember { mutableStateOf(Destination.Create) }

    Scaffold(
        containerColor = Color.Transparent,
        bottomBar = {
            BottomNavigation(
                selected = selected,
                onSelect = { selected = it },
            )
        },
    ) { padding ->
        when (selected) {
            Destination.Create -> HomeScreen(
                padding = padding,
                onOpen = { selected = it },
            )
            else -> ComingSoonScreen(
                destination = selected,
                padding = padding,
                onBack = { selected = Destination.Create },
            )
        }
    }
}

@Composable
private fun HomeScreen(
    padding: PaddingValues,
    onOpen: (Destination) -> Unit,
) {
    val background = Brush.verticalGradient(
        listOf(
            Color(0xFF211039),
            Color(0xFF100B1C),
            Color(0xFF0C101E),
        ),
    )
    val actions = listOf(
        Action("🎬", "Crear una escena", "Elegí un preset, encuadre, texto y ritmo.", Destination.Record),
        Action("📱", "Grabar con varios teléfonos", "Creá una sala y sumá cámaras con QR.", Destination.Record),
        Action("🌐", "Grabar a distancia", "El director coordina teléfonos que están en lugares distintos.", Destination.Record),
        Action("📰", "Noticiero o entrevista", "Pantalla partida, zócalos, titulares y participantes remotos.", Destination.Record),
        Action("✨", "Ensayar una coreografía", "Usá audio de referencia y guías de movimiento.", Destination.Record),
        Action("✂", "Editar lo grabado", "Sincronizá tomas, elegí cortes y agregá títulos.", Destination.Projects),
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(padding)
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 20.dp, vertical = 24.dp),
    ) {
        Text(
            text = "UIZADOR",
            color = MaterialTheme.colorScheme.primary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 4.sp,
        )
        Spacer(Modifier.height(10.dp))
        Text(
            text = "Tu escena.\nTus cámaras.\nTu versión.",
            style = MaterialTheme.typography.displaySmall,
            fontWeight = FontWeight.Black,
            lineHeight = 42.sp,
        )
        Spacer(Modifier.height(12.dp))
        Text(
            text = "Grabá sola o con amigas. La app guía el encuadre, sincroniza los teléfonos y deja todo listo para editar.",
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            style = MaterialTheme.typography.bodyLarge,
        )
        Spacer(Modifier.height(24.dp))
        StatusPill()
        Spacer(Modifier.height(24.dp))

        actions.forEach { action ->
            ActionCard(action = action, onClick = { onOpen(action.destination) })
            Spacer(Modifier.height(12.dp))
        }

        Text(
            text = "Los permisos de cámara y micrófono se pedirán recién al empezar una grabación.",
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 12.dp),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            style = MaterialTheme.typography.bodySmall,
            textAlign = TextAlign.Center,
        )
    }
}

@Composable
private fun StatusPill() {
    Row(
        modifier = Modifier
            .background(
                color = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.12f),
                shape = RoundedCornerShape(999.dp),
            )
            .padding(horizontal = 14.dp, vertical = 9.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Box(
            Modifier
                .size(8.dp)
                .background(
                    color = MaterialTheme.colorScheme.tertiary,
                    shape = RoundedCornerShape(999.dp),
                ),
        )
        Text(
            text = "Preparada para multicámara",
            color = MaterialTheme.colorScheme.tertiary,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.labelLarge,
        )
    }
}

@Composable
private fun ActionCard(action: Action, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.92f),
        ),
    ) {
        Row(
            modifier = Modifier.padding(18.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            Box(
                modifier = Modifier
                    .size(52.dp)
                    .background(
                        color = MaterialTheme.colorScheme.primary.copy(alpha = 0.14f),
                        shape = RoundedCornerShape(18.dp),
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Text(text = action.emoji, fontSize = 24.sp)
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = action.title,
                    fontWeight = FontWeight.Bold,
                    style = MaterialTheme.typography.titleMedium,
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    text = action.subtitle,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    style = MaterialTheme.typography.bodyMedium,
                )
            }
            Text(
                text = "›",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 30.sp,
            )
        }
    }
}

@Composable
private fun BottomNavigation(
    selected: Destination,
    onSelect: (Destination) -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xF2161024))
            .padding(horizontal = 8.dp, vertical = 10.dp),
        horizontalArrangement = Arrangement.SpaceEvenly,
    ) {
        Destination.entries.forEach { destination ->
            TextButton(
                onClick = { onSelect(destination) },
                colors = ButtonDefaults.textButtonColors(
                    contentColor = if (selected == destination) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.onSurfaceVariant
                    },
                ),
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(destination.emoji, fontSize = 18.sp)
                    Text(destination.label, fontSize = 11.sp)
                }
            }
        }
    }
}

@Composable
private fun ComingSoonScreen(
    destination: Destination,
    padding: PaddingValues,
    onBack: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF100B1C))
            .padding(padding)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(destination.emoji, fontSize = 54.sp)
        Spacer(Modifier.height(16.dp))
        Text(
            text = destination.label,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Black,
        )
        Spacer(Modifier.height(8.dp))
        Text(
            text = "La navegación ya está preparada. Esta sección será conectada con los prototipos existentes en la próxima etapa.",
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
        )
        Spacer(Modifier.height(24.dp))
        Button(onClick = onBack) {
            Text("Volver al inicio")
        }
    }
}
