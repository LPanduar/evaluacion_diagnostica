"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export function Palindromo() {
  const [palabra, setPalabra] = useState("")
  const [resultado, setResultado] = useState<boolean | null>(null)

  // Función para validar si una palabra es un palíndromo
  const validarPalindromo = () => {
    if (!palabra.trim()) return

    // Convertimos a minúsculas y eliminamos espacios y caracteres especiales
    const palabraLimpia = palabra.toLowerCase().replace(/[^a-z0-9]/g, "")

    // Comparamos la palabra con su versión invertida
    const esPalindromo = palabraLimpia === palabraLimpia.split("").reverse().join("")

    setResultado(esPalindromo)
  }

  return (
      <Card style={{ borderColor: "#ffccd5" }}>
        <CardHeader style={{ backgroundColor: "rgba(255, 204, 213, 0.2)" }}>
          <CardTitle>Validador de Palíndromos</CardTitle>
          <CardDescription>
            Un palíndromo es una palabra o frase que se lee igual en un sentido que en otro. Ejemplos: ana, oso,
            reconocer, anilina, anita lava la tina, kayak, arenera, radar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
                type="text"
                placeholder="Ingresa una palabra"
                value={palabra}
                onChange={(e) => setPalabra(e.target.value)}
                className="flex-1"
                style={{ borderColor: "#ffccd5" }}
            />
            <Button onClick={validarPalindromo} style={{ backgroundColor: "#ffccd5", color: "#000" }}>
              Validar
            </Button>
          </div>

          {resultado !== null && (
              <Alert
                  className={resultado ? "bg-green-50" : "bg-red-50"}
                  style={{ backgroundColor: resultado ? "rgba(255, 204, 213, 0.2)" : "rgba(254, 202, 202, 0.5)" }}
              >
                <div className="flex items-center gap-2">
                  {resultado ? (
                      <CheckCircle className="h-5 w-5" style={{ color: "#d6336c" }} />
                  ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <AlertDescription style={{ color: resultado ? "#d6336c" : "#dc2626" }}>
                    {resultado ? `"${palabra}" es un palíndromo.` : `"${palabra}" no es un palíndromo.`}
                  </AlertDescription>
                </div>
              </Alert>
          )}
        </CardContent>
      </Card>
  )
}

