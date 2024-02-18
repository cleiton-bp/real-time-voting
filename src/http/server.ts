import fastify from "fastify";
import cookie from "@fastify/cookie"
import websocket from "@fastify/websocket";
import { createPoll } from "./routs/create-poll";
import { getPoll } from "./routs/get-poll";
import { voteOnPoll } from "./routs/vote-on-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify()

app.register(cookie, {
  secret: "polls-app", // para que o usuario nao possa alterar esse cookie - meio que assinando esse cookie para que o usuario nao altere o valor do cookie...
  hook: "onRequest", // antes de qualquer requisicao feita para o backend esse plugin entre em acao e coloca os cookies em um objeto para facilitar a rota...
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

app.listen({port: 3333}).then(() => {
  console.log('HTTP server running!')
})