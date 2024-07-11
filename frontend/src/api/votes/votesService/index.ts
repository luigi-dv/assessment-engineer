import { API_URL, VOTE_ENDPOINT } from "../../../constants/endpoints";
import { Vote } from "src/api/votes/types";

export const votesService = {
  /**
   * Create a new vote
   */
  async createVote(vote: Vote): Promise<Vote> {
    const response = await fetch(`${API_URL}/${VOTE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vote),
    });
    return response.json();
  },

  /**
   * Get a vote by id
   * @param id
   */
  async getVote(id: string): Promise<Vote> {
    const response = await fetch(`${API_URL}/${VOTE_ENDPOINT}/${id}`);
    return response.json();
  },

  /**
   * Get all votes
   */

  async getVotes(): Promise<Vote[]> {
    const response = await fetch(`${API_URL}/${VOTE_ENDPOINT}`);
    return response.json();
  },

  /**
   * Get all votes for a poll
   */
  async getVotesForPoll(pollId: string): Promise<Vote[]> {
    const response = await fetch(`${API_URL}/${VOTE_ENDPOINT}/poll/${pollId}`);
    return response.json();
  },

  /**
   * Delete a vote
   */
  async deleteVote(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${VOTE_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};
