import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { TextField, Button, Stack, Box, Grid, Container } from '@mui/material'

type Dice = {
  number: number | null
  rolls: Array<number>
}

type State = {
  hystory: Array<Dice>
}

// this page manages dice rolls
// user can insert the number of dices, the number of sides
// the result is displayed
const Home: NextPage = () => {
  const [state, setState] = useState<State>({
    hystory: [],
  })

  //implements handleClear, delete all element from hystory except last one
  const handleClear = () => {
    setState({
      hystory: state.hystory.splice(state.hystory.length - 1, 1),
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const numberOfDices = formData.get('numberOfDices')
    const numberOfSides = formData.get('numberOfSides')
    const result = rollDice(numberOfDices as string, numberOfSides as string)
    setState({ hystory: [...state.hystory, result] })
  }

  //implement rollDice function
  //return and object with the result of each dice and the sum of all dices
  const rollDice = (numberOfDices: string, numberOfSides: string): Dice => {
    const numOfDices = parseInt(numberOfDices)
    const numOfSides = parseInt(numberOfSides)
    const rolls = []
    let sum = 0
    for (let i = 0; i < numOfDices; i++) {
      const roll = Math.floor(Math.random() * numOfSides) + 1
      rolls.push(roll)
      sum += roll
    }
    return {
      number: sum,
      rolls,
    }
  }

  return (
    <main>
      <Head>
        <title>Dice roller</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '50px' }}>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
              <TextField id="numberOfDices" label="number of dices" name="numberOfDices" type="number" />
              <TextField id="numberOfSides" label="number of sides" name="numberOfSides" type="number" />
              <Button variant="contained" type="submit">
                Roll
              </Button>
              <Button variant="contained" onClick={handleClear}>
                Delete history
              </Button>
            </Stack>
          </form>
          <Box
            sx={{
              padding: '15px',
              textAlign: 'center',
              fontSize: '20px',
            }}>
            <p>{state.hystory[state.hystory.length - 1]?.number != null ? `Result: ${state.hystory[state.hystory.length - 1].number}` : ''}</p>
            <p>{state.hystory[state.hystory.length - 1]?.rolls.length > 0 ? `Rolls: ${state.hystory[state.hystory.length - 1].rolls.join(', ')}` : ''}</p>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              height: '500px',
              width: '400px',
              overflow: 'auto',
              padding: '15px',
              textAlign: 'center',
              fontSize: '20px',
            }}>
            {/* print history reversed except last element */}
            {state.hystory
              .slice(0, state.hystory.length - 1)
              .reverse()
              .map((dice, index) => (
                <Box key={index}>
                  <hr />
                  <p>Roll#{state.hystory.length - index - 1}</p>
                  <p>{dice.number != null ? `Result: ${dice.number}` : ''}</p>
                  <p>{dice.rolls.length > 0 ? `Rolls: ${dice.rolls.join(', ')}` : ''}</p>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </main>
  )
}

export default Home
