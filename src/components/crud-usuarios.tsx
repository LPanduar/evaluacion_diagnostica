"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, UserPlus, Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Definimos la interfaz para un usuario
interface Usuario {
  id: string
  nombre: string
  edad: number
  contrasena: string
}

export function CrudUsuarios() {
  // Estado para la lista de usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  // Estado para el usuario que se está editando
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState<number | "">("")
  const [contrasena, setContrasena] = useState("")
  // Estado para mensajes de alerta
  const [alerta, setAlerta] = useState<{ tipo: "success" | "error"; mensaje: string } | null>(null)

  // Cargar usuarios del localStorage al iniciar
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem("usuarios")
    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados))
    }
  }, [])

  // Guardar usuarios en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
  }, [usuarios])

  // Función para mostrar una alerta temporal
  const mostrarAlerta = (tipo: "success" | "error", mensaje: string) => {
    setAlerta({ tipo, mensaje })
    setTimeout(() => setAlerta(null), 3000)
  }

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setNombre("")
    setEdad("")
    setContrasena("")
    setUsuarioEditando(null)
  }

  // Función para agregar un nuevo usuario
  const agregarUsuario = () => {
    // Validamos los campos
    if (!nombre || edad === "" || !contrasena) {
      mostrarAlerta("error", "Todos los campos son obligatorios")
      return
    }

    if (typeof edad !== "number" || edad <= 0) {
      mostrarAlerta("error", "La edad debe ser un número positivo")
      return
    }

    // Creamos el nuevo usuario
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre,
      edad,
      contrasena,
    }

    // Actualizamos la lista de usuarios
    setUsuarios([...usuarios, nuevoUsuario])
    mostrarAlerta("success", "Usuario agregado correctamente")
    limpiarFormulario()
  }

  // Función para iniciar la edición de un usuario
  const iniciarEdicion = (usuario: Usuario) => {
    setUsuarioEditando(usuario)
    setNombre(usuario.nombre)
    setEdad(usuario.edad)
    setContrasena(usuario.contrasena)
  }

  // Función para guardar los cambios de un usuario
  const guardarCambios = () => {
    // Validamos los campos
    if (!nombre || edad === "" || !contrasena) {
      mostrarAlerta("error", "Todos los campos son obligatorios")
      return
    }

    if (typeof edad !== "number" || edad <= 0) {
      mostrarAlerta("error", "La edad debe ser un número positivo")
      return
    }

    if (!usuarioEditando) return

    // Actualizamos el usuario
    const usuariosActualizados = usuarios.map((u) =>
        u.id === usuarioEditando.id ? { ...u, nombre, edad, contrasena } : u,
    )

    setUsuarios(usuariosActualizados)
    mostrarAlerta("success", "Usuario actualizado correctamente")
    limpiarFormulario() //:3
  }

  // Función para eliminar un usuario
  const eliminarUsuario = (id: string) => {
    // Confirmamos la eliminación
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return

    // Filtramos el usuario a eliminar
    const usuariosFiltrados = usuarios.filter((u) => u.id !== id)
    setUsuarios(usuariosFiltrados)
    mostrarAlerta("success", "Usuario eliminado correctamente")

    // Si estamos editando el usuario que se eliminó, limpiamos el formulario
    if (usuarioEditando && usuarioEditando.id === id) {
      limpiarFormulario()
    }
  }

  return (
      <Card style={{ borderColor: "#ffccd5" }}>
        <CardHeader style={{ backgroundColor: "rgba(255, 204, 213, 0.2)" }}>
          <CardTitle>Gestión de Usuarios</CardTitle>
          <CardDescription>Agrega, edita, elimina y visualiza usuarios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Formulario */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{usuarioEditando ? "Editar Usuario" : "Agregar Usuario"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del usuario"
                    style={{ borderColor: "#ffccd5" }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                    id="edad"
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value ? Number.parseInt(e.target.value) : "")}
                    placeholder="Edad del usuario"
                    style={{ borderColor: "#ffccd5" }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contrasena">Contraseña</Label>
                <Input
                    id="contrasena"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Contraseña"
                    style={{ borderColor: "#ffccd5" }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {usuarioEditando ? (
                  <>
                    <Button
                        onClick={guardarCambios}
                        className="flex-1"
                        style={{ backgroundColor: "#ffccd5", color: "#000" }}
                    >
                      <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                    </Button>
                    <Button variant="outline" onClick={limpiarFormulario} style={{ borderColor: "#ffccd5", color: "#000" }}>
                      Cancelar
                    </Button>
                  </>
              ) : (
                  <Button onClick={agregarUsuario} className="flex-1" style={{ backgroundColor: "#ffccd5", color: "#000" }}>
                    <UserPlus className="mr-2 h-4 w-4" /> Agregar Usuario
                  </Button>
              )}
            </div>
          </div>

          {/* Alerta */}
          {alerta && (
              <Alert
                  className={alerta.tipo === "success" ? "bg-green-50" : "bg-red-50"}
                  style={{
                    backgroundColor: alerta.tipo === "success" ? "rgba(255, 204, 213, 0.2)" : "rgba(254, 202, 202, 0.5)",
                  }}
              >
                <AlertDescription style={{ color: alerta.tipo === "success" ? "#d6336c" : "#dc2626" }}>
                  {alerta.mensaje}
                </AlertDescription>
              </Alert>
          )}

          {/* Tabla de usuarios */}
          {usuarios.length > 0 ? (
              <div className="rounded-md border" style={{ borderColor: "#ffccd5" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Edad</TableHead>
                      <TableHead>Contraseña</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell className="font-mono text-xs">{usuario.id}</TableCell>
                          <TableCell>{usuario.nombre}</TableCell>
                          <TableCell>{usuario.edad}</TableCell>
                          <TableCell>{"•".repeat(8)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => iniciarEdicion(usuario)}
                                  style={{ borderColor: "#ffccd5" }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="icon" onClick={() => eliminarUsuario(usuario.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          ) : (
              <div className="text-center py-4 text-muted-foreground">
                No hay usuarios registrados. Agrega uno nuevo para comenzar.
              </div>
          )}
        </CardContent>
      </Card>
  )
}

