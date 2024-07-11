import { Poll } from "src/api/polls/types";
import { API_URL, POLL_ENDPOINT } from "src/constants/endpoints";
import { votesService } from "../../votes/votesService";

export const pollsService = {
  /**
   * Create a new poll
   */
  async createPoll(poll: Poll): Promise<Poll> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(poll),
    });
    return response.json();
  },
  /**
   * Get a poll by id
   * @param id
   */
  async getPoll(id: string): Promise<Poll> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}/${id}`);
    return response.json();
  },
  /**
   * Get all polls
   */
  async getPolls(extended: boolean): Promise<Poll[]> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}`);
    const result = await response.json();
    if (extended) {
      for (const poll of result) {
        poll.votes = await votesService.getVotesForPoll(poll._id);
      }
    }
    return result;
  },
  /**
   * Delete a poll
   */
  async deletePoll(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};
