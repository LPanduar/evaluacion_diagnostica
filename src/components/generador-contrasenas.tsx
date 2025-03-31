"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Clipboard, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function GeneradorContrasenas() {
  const [longitud, setLongitud] = useState(12)
  const [incluirMayusculas, setIncluirMayusculas] = useState(true)
  const [incluirNumeros, setIncluirNumeros] = useState(true)
  const [incluirEspeciales, setIncluirEspeciales] = useState(true)
  const [contrasena, setContrasena] = useState("")
  const [copiado, setCopiado] = useState(false)

  // Función para generar una contraseña aleatoria
  const generarContrasena = () => {
    // Definimos los caracteres posibles según las opciones seleccionadas
    const minusculas = "abcdefghijklmnopqrstuvwxyz"
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numeros = "0123456789"
    const especiales = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    // Creamos el conjunto de caracteres a utilizar
    let caracteres = minusculas
    if (incluirMayusculas) caracteres += mayusculas
    if (incluirNumeros) caracteres += numeros
    if (incluirEspeciales) caracteres += especiales

    // Generamos la contraseña
    let nuevaContrasena = ""

    // Aseguramos que la contraseña cumpla con los requisitos mínimos
    let tieneMayuscula = !incluirMayusculas
    let tieneNumero = !incluirNumeros
    let tieneEspecial = !incluirEspeciales

    // Generamos caracteres aleatorios hasta alcanzar la longitud deseada
    while (nuevaContrasena.length < longitud) {
      const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length))
      nuevaContrasena += caracterAleatorio

      // Verificamos si el carácter cumple alguno de los requisitos
      if (!tieneMayuscula && mayusculas.includes(caracterAleatorio)) tieneMayuscula = true
      if (!tieneNumero && numeros.includes(caracterAleatorio)) tieneNumero = true
      if (!tieneEspecial && especiales.includes(caracterAleatorio)) tieneEspecial = true
    }

    // Si no se cumplen todos los requisitos, regeneramos la contraseña x_X
    if (!(tieneMayuscula && tieneNumero && tieneEspecial)) {
      return generarContrasena()
    }

    setContrasena(nuevaContrasena)
    setCopiado(false)
  } //:3

  // Función para copiar la contraseña al portapapeles
  const copiarContrasena = () => {
    if (!contrasena) return

    navigator.clipboard.writeText(contrasena).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
      <Card style={{ borderColor: "#c2f0ff" }}>
        <CardHeader style={{ backgroundColor: "rgba(194, 240, 255, 0.2)" }}>
          <CardTitle>Generador de Contraseñas</CardTitle>
          <CardDescription>Genera contraseñas seguras con los requisitos que necesites.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Longitud: {longitud} caracteres</Label>
            </div>
            <Slider value={[longitud]} min={8} max={30} step={1} onValueChange={(value) => setLongitud(value[0])} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="incluir-mayusculas">Incluir mayúsculas (A-Z)</Label>
              <Switch id="incluir-mayusculas" checked={incluirMayusculas} onCheckedChange={setIncluirMayusculas} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="incluir-numeros">Incluir números (0-9)</Label>
              <Switch id="incluir-numeros" checked={incluirNumeros} onCheckedChange={setIncluirNumeros} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="incluir-especiales">Incluir caracteres especiales (!@#$%)</Label>
              <Switch id="incluir-especiales" checked={incluirEspeciales} onCheckedChange={setIncluirEspeciales} />
            </div>
          </div>

          <Button onClick={generarContrasena} className="w-full" style={{ backgroundColor: "#c2f0ff", color: "#0c4a6e" }}>
            <RefreshCw className="mr-2 h-4 w-4" /> Generar Contraseña
          </Button>

          {contrasena && (
              <div className="relative">
                <Input value={contrasena} readOnly className="pr-10 font-mono" style={{ borderColor: "#c2f0ff" }} />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={copiarContrasena}>
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
          )}

          {copiado && (
              <Alert className="bg-green-50" style={{ backgroundColor: "rgba(194, 240, 255, 0.2)" }}>
                <AlertDescription style={{ color: "#0c4a6e" }}>Contraseña copiada al portapapeles</AlertDescription>
              </Alert>
          )}
        </CardContent>
      </Card>
  )
}

