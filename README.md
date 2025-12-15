# Proyecto de Tienda con React + Vite

# 🛒 eCommerce Project - React

Este es el proyecto final para el curso de Desarrollo Frontend. Es una aplicación de tienda en línea completa desarrollada con **React** y **Vite**, que simula un entorno real de comercio electrónico conectándose a la **FakeStoreAPI**.

## 🚀 Características Principales

### 1. Gestión de Estado Global (Context API)
- **Carrito de Compras:** Funcionalidad para agregar, eliminar y calcular totales. Persistencia durante la navegación.
- **Autenticación:** Simulación de Login (usuario: `admin`) con protección de rutas privadas.
- **Productos:** Carga centralizada de datos y gestión de operaciones CRUD.

### 2. CRUD de Productos (Administrador)
- **Crear:** Formulario validado para ingresar nuevos productos.
- **Leer:** Catálogo completo con buscador y paginación.
- **Actualizar:** Edición de productos existentes (título, precio, descripción).
- **Eliminar:** Borrado de productos con confirmación de seguridad.
- *Nota: Las operaciones de modificación son simuladas localmente ya que la API es de solo lectura para cambios persistentes.*

### 3. UI/UX y Diseño Responsivo
- Diseño adaptable utilizando el **Grid System de Bootstrap**.
- Notificaciones no intrusivas con **React Toastify**.
- Iconos modernos con **React Icons**.
- Optimización SEO dinámica en detalles de producto con **React Helmet**.

### 4. Funcionalidades Avanzadas
- **Buscador en tiempo real:** Filtrado por nombre de producto.
- **Paginación:** Navegación fluida por el catálogo (8 productos por página).

---

## 🛠️ Tecnologías Utilizadas

- **Core:** React 18, Vite.
- **Enrutamiento:** React Router Dom v6.
- **Estilos:** Bootstrap 5, CSS3.
- **Utilidades:** React Toastify (Alertas), React Icons (Iconografía), React Helmet (SEO).
- **Backend:** FakeStoreAPI (Mock Data).

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio** (o descargar el código):
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>

(R) Jefferson Moncada
