import { Kafka } from 'kafkajs'

const broker1 = process.env.BROKER1 ?? ''
const broker2 = process.env.BROKER2 ?? ''
const broker3 = process.env.BROKER3 ?? ''

const kafka = new Kafka({
  clientId: 'mentor-app',
  brokers: [broker1, broker2, broker3]
})

export default kafka
