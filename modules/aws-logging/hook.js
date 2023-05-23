import { CloudWatchLogsClient, CreateLogStreamCommand, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs"
import { useRef } from "react"

const useLogger = ({ logGroupName, logStreamName, region, accessKeyId, secretAccessKey }) => {
  const credentials = {
    accessKeyId,
    secretAccessKey,
  }

  const config = {
    region,
    credentials,
  }

  const persistentLogStreamName = useRef(logStreamName)

  const initalizeLogStream = async (newLogStreamName) => {
    try {
      const input = {
        logGroupName,
        logStreamName: newLogStreamName,
      }

      const client = new CloudWatchLogsClient(config)

      const command = new CreateLogStreamCommand(input)
      const response = await client.send(command)

      persistentLogStreamName.current = newLogStreamName
      // eslint-disable-next-line
      console.log(response)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  const log = async (message) => {
    try {
      // Stringify the message as JSON.
      const jsonMessage = JSON.stringify(message)

      const input = {
        logGroupName,
        logStreamName: persistentLogStreamName.current,
        logEvents: [{ jsonMessage, timeStamp: new Date() }],
      }

      const client = new CloudWatchLogsClient(config)

      const command = new PutLogEventsCommand(input)

      const response = await client.send(command)

      // eslint-disable-next-line
      console.log(response)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  return { log, initalizeLogStream }
}

export default useLogger
