'use client';
import {useState} from "react"
import data from './conversionTable.json'
import * as temperatureFunctions from './temperatureTable.js'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UserInput = ({...props}) => {
    const uppercase = props.unit
    const lowercase = uppercase.toLowerCase()
    const options = props.options
    const [fromUnit, setFromUnit] = useState(null) 
    const [toUnit, setToUnit] = useState(null)
    const [toShowResult, setShowResult] = useState(false)
    const [result, setResult] = useState(null)
    const [input, setInput] = useState('')
    const [error, setError] = useState(false)
    const swapUnits = () => {
        let temp = fromUnit
        setFromUnit(toUnit)
        setToUnit(temp)
    }
    const convert = () => {
        if (error) {
            return
        }
        setShowResult(!toShowResult)
        let toResult
        if (lowercase === "length") {
            const toMeter = input / data.length[fromUnit]
            toResult = toMeter * data.length[toUnit]
        } else if (lowercase === "mass") {
            const toGram =  input / data.mass[fromUnit]
            toResult = toGram * data.mass[toUnit]
        } else {
            if (fromUnit === "Celsius") {
                if (toUnit === "Fahrenheit") {
                    toResult = temperatureFunctions.celsiusToFahrenheit(input)
                } else if (toUnit === "Kelvin") {
                    toResult = temperatureFunctions.celsiusToKelvin(input)
                } else {
                    toResult = input
                }
            } else if (fromUnit === "Fahrenheit") {
                if (toUnit === "Fahrenheit") {
                    toResult = input
                } else if (toUnit === "Kelvin") {
                    toResult = temperatureFunctions.fahrenheitToKelvin(input)
                } else {
                    toResult = temperatureFunctions.fahrenheitToCelsius(input)
                }
            } else {
                if (toUnit === "Fahrenheit") {
                    toResult = temperatureFunctions.kelvinToFahrenheit(input)
                } else if (toUnit === "Kelvin") {
                    toResult = input
                } else {
                    toResult = temperatureFunctions.kelvinToCelsius(input)
                }
            }
        }
        setResult(toResult)
    }
    const handleInputChange = e => {
        const input = e.target.value
        if (input === "") {
            setError(false)
        } else if (!isNaN(input) && parseFloat(input) >= 0) {
            setError(false)
        } else {
            setError(true)
        }
        setInput(input)
        return
    }
    const back = () => {
        setShowResult(!toShowResult)
    }
    const reset = () => {
        setInput('')
        setShowResult(!toShowResult)
    }
    return (
        <Card>
            <CardHeader>
            <CardTitle>{uppercase}</CardTitle>
            <CardDescription>
                {`Convert from one unit of ${lowercase} to another`}
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
            {!toShowResult && <div>
                <div className="space-y-1">
                <Label htmlFor={lowercase}>Enter the {lowercase} to Convert</Label>
                <Input id={lowercase} value={input} onChange={handleInputChange} className={error ? 'border-red-500' : 'border-gray-300'} />
                </div>
                <div className="space-y-1">
                <Label htmlFor="unitFrom">From:</Label>
                <Select onValueChange={(value) => setFromUnit(value)} value={fromUnit}>
                    <SelectTrigger>
                    <SelectValue placeholder="Unit"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Units</SelectLabel>
                        {options.map((unit) => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-1">
                <Label htmlFor="unitTo">To: </Label>
                <Select onValueChange={(value) => setToUnit(value)} value={toUnit}>
                    <SelectTrigger>
                    <SelectValue placeholder="Unit"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Units</SelectLabel>
                        {options.map((unit) => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>                  
                </div>
            </div>}
            {toShowResult && 
                <div className="space-y-1">
                <Label htmlFor={lowercase}>Result: </Label>
                <h3>{result}</h3>
                </div>
            }
            </CardContent>
            {!toShowResult &&
            <CardFooter className="gap-4">
                <Button variant="secondary" onClick={swapUnits}>Swap units</Button>
                <Button onClick={convert}>Convert</Button>
            </CardFooter>
            }
            {toShowResult &&
            <CardFooter className="gap-4">
                <Button variant="secondary" onClick={back}>Back</Button>
                <Button onClick={reset}>Reset</Button>
            </CardFooter>
            }
        </Card>
    )
}

export default UserInput