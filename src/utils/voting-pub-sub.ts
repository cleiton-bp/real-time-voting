type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscriber(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, menssage: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(menssage)
    }
  }
}

export const voting = new VotingPubSub()