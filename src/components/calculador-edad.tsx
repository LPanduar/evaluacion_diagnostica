"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Clock } from "lucide-react"

export function CalculadorEdad() {
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [horaNacimiento, setHoraNacimiento] = useState("")
  const [edad, setEdad] = useState<string | null>(null)

  // Función para calcular la edad exacta
  const calcularEdad = () => {
    if (!fechaNacimiento) return

    // Obtenemos la fecha y hora de nacimiento
    const fechaHoraNacimiento = new Date(`${fechaNacimiento}T${horaNacimiento || "00:00"}`)
    const ahora = new Date()

    const diferenciaMilisegundos = ahora.getTime() - fechaHoraNacimiento.getTime()

    // Calculamos años, meses, semanas, días y horas
    const milisegundosEnAnio = 1000 * 60 * 60 * 24 * 365.25
    const milisegundosEnMes = milisegundosEnAnio / 12
    const milisegundosEnSemana = 1000 * 60 * 60 * 24 * 7
    const milisegundosEnDia = 1000 * 60 * 60 * 24
    const milisegundosEnHora = 1000 * 60 * 60

    const anios = Math.floor(diferenciaMilisegundos / milisegundosEnAnio)
    let resto = diferenciaMilisegundos % milisegundosEnAnio

    const meses = Math.floor(resto / milisegundosEnMes)
    resto = resto % milisegundosEnMes

    const semanas = Math.floor(resto / milisegundosEnSemana)
    resto = resto % milisegundosEnSemana

    const dias = Math.floor(resto / milisegundosEnDia)
    resto = resto % milisegundosEnDia //:3

    const horas = Math.floor(resto / milisegundosEnHora)

    // Formateamos el resultado
    setEdad(`${anios} años, ${meses} meses, ${semanas} semanas, ${dias} días y ${horas} horas`)
  }

  return (
      <Card style={{ borderColor: "#c2f0ff" }}>
        <CardHeader style={{ backgroundColor: "rgba(194, 240, 255, 0.2)" }}>
          <CardTitle>Calculador de Edad Exacta</CardTitle>
          <CardDescription>Calcula tu edad exacta en años, meses, semanas, días y horas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha-nacimiento" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" /> Fecha de Nacimiento
              </Label>
              <Input
                  id="fecha-nacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  style={{ borderColor: "#c2f0ff" }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora-nacimiento" className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Hora de Nacimiento
              </Label>
              <Input
                  id="hora-nacimiento"
                  type="time"
                  value={horaNacimiento}
                  onChange={(e) => setHoraNacimiento(e.target.value)}
                  style={{ borderColor: "#c2f0ff" }}
              />
            </div>
          </div>

          <Button onClick={calcularEdad} className="w-full" style={{ backgroundColor: "#c2f0ff", color: "#0c4a6e" }}>
            Calcular Edad
          </Button>

          {edad && (
              <Alert className="bg-blue-50" style={{ backgroundColor: "rgba(194, 240, 255, 0.2)" }}>
                <AlertDescription style={{ color: "#0c4a6e" }}>Tu edad exacta es: {edad}</AlertDescription>
              </Alert>
          )}
        </CardContent>
      </Card>
  )
}

