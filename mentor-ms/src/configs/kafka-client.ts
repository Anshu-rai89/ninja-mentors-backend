import { Kafka } from 'kafkajs'
const broker = process.env.BROKER ?? ''

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [broker]
})

export default kafka
