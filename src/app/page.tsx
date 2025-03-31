"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palindromo } from "@/components/palindromo"
import { CalculadorEdad } from "@/components/calculador-edad"
import { GeneradorContrasenas } from "@/components/generador-contrasenas"
import { Ahorcado } from "@/components/ahorcado"
import { Fibonacci } from "@/components/fibonacci"
import { CrudUsuarios } from "@/components/crud-usuarios"

export default function Home() {
  return (
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Algoritmos</h1>

        <Tabs defaultValue="palindromo" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="palindromo">Palíndromo</TabsTrigger>
            <TabsTrigger value="edad">Calculador Edad</TabsTrigger>
            <TabsTrigger value="contrasenas">Generador Contraseñas</TabsTrigger>
            <TabsTrigger value="ahorcado">Ahorcado</TabsTrigger>
            <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
            <TabsTrigger value="crud">CRUD Usuarios</TabsTrigger>
          </TabsList>

          <TabsContent value="palindromo">
            <Palindromo />
          </TabsContent>

          <TabsContent value="edad">
            <CalculadorEdad />
          </TabsContent>

          <TabsContent value="contrasenas">
            <GeneradorContrasenas />
          </TabsContent>

          <TabsContent value="ahorcado">
            <Ahorcado />
          </TabsContent>

          <TabsContent value="fibonacci">
            <Fibonacci />
          </TabsContent>

          <TabsContent value="crud">
            <CrudUsuarios />
          </TabsContent>
        </Tabs>
      </main>
  )
}

//Firmita :3