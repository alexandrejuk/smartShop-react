import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Button from '../components/Button'
import Card from '../components/Card'
import Header from '../components/Header'
import Input from '../components/Input'

storiesOf('Button', module)
  .add('Default', () => <Button text="Default Button"/>)

storiesOf('Card', module)
  .add('Default', () => <Card/>)

storiesOf('Header', module)
  .add('Default', () => <Header/>)
  
storiesOf('Input', module)
  .add('Small', () => <Input name="small-1" sizeInput="inputSize-1" text="small-1" type="text"/>)
  .add('Default', () => <Input name="default-4" sizeInput="inputSize-4" text="defaul-4" type="text"/>)
  .add('Large', () => <Input name="large-7" sizeInput="inputSize-9" text="Large-7" type="text"/>)
  
  
