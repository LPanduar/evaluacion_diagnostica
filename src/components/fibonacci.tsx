"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Fibonacci() {
  const [posicion, setPosicion] = useState<number>(10)
  const [secuencia, setSecuencia] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  // Función para generar la secuencia de Fibonacci
  const generarFibonacci = () => {
    // Validamos la entrada
    if (posicion <= 0) {
      setError("La posición debe ser un número positivo")
      setSecuencia([])
      return
    }

    if (posicion > 50) {
      setError("Por favor, ingresa un número menor o igual a 50 para evitar problemas de rendimiento")
      setSecuencia([])
      return
    } //:3

    setError(null)

    // Generamos la secuencia
    const resultado: number[] = []

    for (let i = 0; i < posicion; i++) {
      if (i <= 1) {
        resultado.push(i)
      } else {
        resultado.push(resultado[i - 1] + resultado[i - 2])
      }
    }

    setSecuencia(resultado)
  }

  return (
      <Card style={{ borderColor: "#ffccd5" }}>
        <CardHeader style={{ backgroundColor: "rgba(255, 204, 213, 0.2)" }}>
          <CardTitle>Sucesión de Fibonacci</CardTitle>
          <CardDescription>
            La sucesión de Fibonacci es una secuencia donde cada número es la suma de los dos anteriores, comenzando con 0
            y 1. Por ejemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="posicion">Posición (hasta 50)</Label>
            <div className="flex gap-2">
              <Input
                  id="posicion"
                  type="number"
                  min="1"
                  max="50"
                  value={posicion}
                  onChange={(e) => setPosicion(Number.parseInt(e.target.value) || 0)}
                  className="flex-1"
                  style={{ borderColor: "#ffccd5" }}
              />
              <Button onClick={generarFibonacci} style={{ backgroundColor: "#ffccd5", color: "#000" }}>
                Generar
              </Button>
            </div>
          </div>

          {error && (
              <Alert className="bg-red-50">
                <AlertDescription className="text-red-600">{error}</AlertDescription>
              </Alert>
          )}

          {secuencia.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Secuencia de Fibonacci hasta la posición {posicion}:</h3>
                <div
                    className="bg-muted p-3 rounded-md overflow-x-auto"
                    style={{ backgroundColor: "rgba(255, 204, 213, 0.1)" }}
                >
                  <div className="flex flex-wrap gap-2">
                    {secuencia.map((numero, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center min-w-[40px] h-10 rounded-md px-2"
                            style={{ backgroundColor: "#ffccd5", color: "#000" }}
                        >
                          <span className="text-xs">{index}</span>
                          <span>{numero}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium">Representación visual:</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {secuencia.map((numero, index) => (
                        <div key={index} className="relative group">
                          <div
                              className="rounded-sm"
                              style={{
                                width: `${Math.min(numero * 5, 300)}px`,
                                height: "20px",
                                minWidth: "20px",
                                backgroundColor: "rgba(255, 204, 213, 0.8)",
                              }}
                          ></div>
                          <div className="absolute top-0 left-2 text-xs" style={{ color: "#000" }}>
                            {numero}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}
        </CardContent>
      </Card>
  )
}

