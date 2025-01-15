'use client';

import UserInput from '@/components/card/card'
import {lengthUnits, weightUnits, tempUnits} from '@/app/constants'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] h-screen items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Unit Converter
        </h1>
        <Tabs defaultValue="length" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="mass">Mass</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
          </TabsList>
          <TabsContent value="length">
            <UserInput unit="Length" options={lengthUnits}/>
          </TabsContent>
          <TabsContent value="mass">
            <UserInput unit="Mass" options={weightUnits} />
          </TabsContent>
          <TabsContent value="temperature">
            <UserInput unit="Temperature" options={tempUnits} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
