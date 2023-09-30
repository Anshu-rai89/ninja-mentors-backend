import { Kafka } from 'kafkajs'

const broker = process.env.BROKER ?? ''

const kafka = new Kafka({
  clientId: 'mentor-app',
  brokers: [broker]
})

export default kafka
