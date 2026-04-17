# Configuración de Mona - Eventos de 15 Años

## Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

```bash
cp .env.example .env
```

### Variables necesarias:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp (con código de país) | `5491112345678` |
| `VITE_CONTACT_EMAIL` | Email de contacto | `info@monaeventos.com` |

## Personalización

### Cambiar fotos de la galería
Editar `src/pages/Galeria.tsx` y modificar el array `mockPhotos` con las URLs de tus fotos.

### Cambiar fechas ocupadas
Editar `src/pages/Disponibilidad.tsx` y modificar el array `occupiedDates`.

### Conectar formulario de contacto
El formulario en `src/pages/Disponibilidad.tsx` tiene un TODO donde puedes implementar el envío via email (ej: EmailJS), API propia, o integración con servicio de forms.

### Cambiar colores del tema
Editar `src/context/ThemeContext.tsx` y modificar el objeto `theme`.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
