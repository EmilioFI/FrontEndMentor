# Masterclass: Imágenes responsive y aspect-ratio en HTML/CSS

## 0. El problema de fondo

Una imagen tiene un **aspect ratio intrínseco** (ancho/alto del archivo original). Cuando el contenedor cambia de tamaño (responsive), tienes que decidir:

- ¿Se deforma la imagen o se mantiene su proporción?
- ¿Se recorta (crop) o se ve completa (contain)?
- ¿Reservamos espacio antes de que cargue, para evitar saltos de layout (CLS)?
- ¿Servimos la misma imagen a un móvil de 360px que a un monitor 4K?

Son problemas distintos y cada uno tiene su herramienta. Vamos por partes.

---

## 1. `object-fit` y `object-position` — cómo se comporta la imagen dentro de su caja

Esto es lo primero que hay que dominar. Le dices al `<img>` (o `<video>`) cómo rellenar una caja de tamaño fijo.

```css
.card__img {
  width: 100%;
  height: 250px;       /* caja de tamaño fijo, la imagen NO decide su altura */
  object-fit: cover;   /* recorta manteniendo proporción, rellena toda la caja */
  object-position: center top; /* qué parte de la imagen se ve al recortar */
}
```

Valores clave de `object-fit`:

| Valor | Comportamiento |
|---|---|
| `cover` | Rellena la caja, recorta lo que sobre. **El más usado en cards/hero.** |
| `contain` | Se ve entera, puede dejar espacio vacío (letterboxing). Útil para logos. |
| `fill` (default) | Deforma la imagen para llenar la caja. Casi nunca lo quieres. |
| `none` | Tamaño original, ignora la caja. |

**Regla mental:** si defines `width` y `height` (o `height` fija) en el contenedor, `object-fit: cover` es tu escape hatch para que no se deforme.

---

## 2. `aspect-ratio` — la propiedad moderna (2021+, ya con soporte total)

Antes había que usar el "padding-top hack" (un `padding-top: 56.25%` en un div envolvente). **Ya no hace falta.** Ahora:

```css
.card__img {
  width: 100%;
  aspect-ratio: 16 / 9;   /* o 1 / 1, o 4 / 3... */
  object-fit: cover;
}
```

Esto le dice al navegador: "calcula la altura tú mismo a partir del ancho, para mantener esta proporción". El navegador reserva el espacio **antes de que la imagen cargue**, así que no hay salto de layout.

Truco útil: si no sabes el ratio exacto pero quieres usar el intrínseco de la imagen, puedes omitir `aspect-ratio` y en su lugar poner los atributos `width`/`height` en el HTML (ver punto 3) — el navegador calcula el ratio solo.

### Combo típico para una card

```html
<div class="card">
  <img class="card__img" src="foto.jpg" alt="..." width="400" height="225">
</div>
```

```css
.card__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: attr(width) / attr(height); /* aún no soportado en todos, mejor explícito abajo */
}

/* versión segura y ampliamente soportada: */
.card__img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

---

## 3. Los atributos `width` y `height` en el HTML: NO son solo para tamaño fijo

Error de principiante: pensar que poner `width="400" height="225"` en el `<img>` "rompe" el responsive. **Falso.** Desde que existe `aspect-ratio` calculado automáticamente por el navegador, estos atributos sirven para que el navegador sepa la proporción **antes de descargar la imagen**, y reserve el hueco exacto.

```css
img {
  max-width: 100%;
  height: auto;
}
```

Con este CSS global (el más importante de toda la masterclass, honestamente), cualquier `<img width height>` se comporta así:
- Nunca desborda su contenedor (`max-width: 100%`)
- Escala manteniendo proporción (`height: auto`)
- Pero el navegador ya sabe el ratio real gracias a los atributos HTML → **reserva espacio → cero Cumulative Layout Shift**

Esta combinación (`width`/`height` en HTML + `max-width:100%; height:auto` en CSS) es el estándar recomendado hoy en día (web.dev, MDN). No los quites nunca "porque ya tengo CSS responsive".

---

## 4. Imágenes realmente responsive: `srcset` y `sizes`

Todo lo anterior controla el **layout**. Esto controla qué **archivo** se descarga según el dispositivo — clave para rendimiento.

### 4.1 Resolución (misma imagen, distintas densidades de píxel)

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="...">
```

- `srcset`: le das al navegador candidatas con su ancho real (`400w` = el archivo mide 400px).
- `sizes`: le dices qué **ancho ocupará la imagen en pantalla** según el viewport. El navegador cruza esta info con el `srcset` y elige el archivo óptimo — tú no decides cuál, decide el navegador.

Léelo así: *"si el viewport mide 600px o menos, la imagen ocupará el 100% del viewport; si no, ocupará el 50%"*. Con eso, el navegador calcula qué candidata descargar.

### 4.2 Art direction (imágenes DIFERENTES, no solo redimensionadas)

Cuando en móvil quieres un recorte distinto (por ejemplo, un plano más cerrado) y no solo una versión más pequeña:

```html
<picture>
  <source media="(max-width: 600px)" srcset="foto-cuadrada.jpg">
  <source media="(min-width: 601px)" srcset="foto-panoramica.jpg">
  <img src="foto-panoramica.jpg" alt="...">
</picture>
```

El `<img>` final es obligatorio como fallback. `<picture>` también sirve para servir formatos modernos con fallback:

```html
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="..." width="800" height="450" loading="lazy">
</picture>
```

El navegador coge el primer `<source>` cuyo `type` soporte; si no soporta ninguno, usa el `<img>`.

---

## 5. `background-image` vs `<img>`: cuándo usar cada uno

| Usa `<img>` cuando... | Usa `background-image` cuando... |
|---|---|
| La imagen es **contenido** (foto de producto, avatar, ilustración con significado) | La imagen es **decoración** (textura, patrón, overlay) |
| Necesitas `alt` para accesibilidad/SEO | No aporta información semántica |
| Quieres `srcset`/`picture` para responsive real | Te basta con `background-size` |

Con fondo, el equivalente a `object-fit: cover` es:

```css
.hero {
  background-image: url('hero.jpg');
  background-size: cover;      /* equivalente a object-fit: cover */
  background-position: center; /* equivalente a object-position */
  aspect-ratio: 21 / 9;        /* también funciona aquí para reservar altura */
}
```

**Regla práctica de accesibilidad:** si al quitar la imagen pierdes información, es `<img>` con `alt`. Si solo pierdes estética, es `background-image`.

---

## 6. Lazy loading y prioridad de carga

```html
<!-- Imagen bajo el fold: que cargue tarde -->
<img src="foto.jpg" loading="lazy" decoding="async" alt="...">

<!-- Imagen del hero / LCP: que cargue YA, con prioridad -->
<img src="hero.jpg" loading="eager" fetchpriority="high" alt="...">
```

- `loading="lazy"`: el navegador no descarga la imagen hasta que se acerca al viewport. Gratis, nativo, sin JS.
- Nunca pongas `loading="lazy"` en la imagen principal (hero/LCP) — la retrasarías justo cuando más la necesitas.
- `fetchpriority="high"` en la imagen más importante (normalmente la de LCP) ayuda a Core Web Vitals.

---

## 7. Patrones de layout habituales

### Grid de cards con imágenes uniformes (como tus Frontend Mentor challenges)

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  border-radius: 0.5rem 0.5rem 0 0;
}
```

### Avatar circular perfecto sea cual sea la foto original

```css
.avatar {
  width: 64px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
}
```

### Hero de ancho completo con altura controlada

```css
.hero-img {
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  object-position: center 30%; /* si la parte interesante no está en el centro */
}
```

---

## 8. Errores típicos (y cómo detectarlos)

1. **Imagen deformada** → te falta `object-fit: cover` (o `contain`) en un contenedor con altura fija.
2. **Salto de layout al cargar (CLS)** → te faltan `width`/`height` en el `<img>` o un `aspect-ratio` explícito.
3. **Imagen que se sale del contenedor en móvil** → te falta `max-width: 100%; height: auto;` global.
4. **Imagen pixelada en pantallas retina** → te falta `srcset` con densidades mayores (`2x`, `3x`) o resoluciones mayores.
5. **Descargas un JPG de 3000px para mostrarlo en un móvil a 300px** → te falta `srcset` + `sizes`, estás desperdiciando datos del usuario.
6. **`object-position` no hace nada** → revisa que `object-fit` no sea `fill` (con `fill` no hay recorte, así que `object-position` no tiene efecto).

---

## 9. Checklist para cualquier imagen que metas en una página

- [ ] `alt` descriptivo (o `alt=""` si es puramente decorativa)
- [ ] `width` y `height` en el HTML (aunque el CSS luego la haga responsive)
- [ ] CSS global `img { max-width: 100%; height: auto; }`
- [ ] Si va en una caja de altura fija/controlada → `object-fit: cover` + `aspect-ratio`
- [ ] Si es contenido bajo el fold → `loading="lazy"`
- [ ] Si es tu imagen de LCP (hero) → `fetchpriority="high"`, sin lazy
- [ ] Si necesitas distintos recortes por dispositivo → `<picture>` con `media`
- [ ] Si solo necesitas distintas resoluciones → `srcset` + `sizes`
- [ ] Formatos modernos con fallback (`avif`/`webp` → `jpg`) si el proyecto lo permite

---

## 10. Mini demo mental (para practicar)

Coge una card de un Frontend Mentor challenge que ya tengas hecho y pregúntate:
1. ¿La imagen tiene `object-fit`? ¿Por qué sí o por qué no lo necesita?
2. ¿Qué pasa si la cambias por una foto con proporción muy distinta (una vertical 9:16)? ¿Se rompe algo?
3. ¿Estás reservando espacio con `aspect-ratio` o `width`/`height`, o confías en que cargue rápido y ya está?

Si puedes responder a eso sin mirar la solución, tienes el concepto interiorizado.
