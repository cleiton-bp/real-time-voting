import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import { z } from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    // inscrever apenas nas mensagens publicadas no canal com o ID da enquete ('pollId') da url
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    voting.subscriber(pollId, (message) => { 
      connection.socket.send(JSON.stringify(message))
    })
  })
}

// - pub/sub - publish -
// - e um paters que lidao com eventos
// - aconteceu algo entao deve fazer tal coisa
// - por isso existe paters para lidar com isso 