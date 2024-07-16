import { Poll } from "src/api/polls/types";
import { API_URL, POLL_ENDPOINT } from "src/constants/endpoints";
import { votesService } from "src/api/votes/votesService";
import { optionsService } from "src/api/options/optionsService";

export const pollsService = {
  /**
   * Create a new poll
   */
  async createPoll(poll: Poll): Promise<Poll> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/form-data",
      },
      body: JSON.stringify(poll),
    });
    if (!response.ok) {
      throw new Error("Error creating poll");
    }
    return response.json();
  },

  /**
   * Get a poll by id
   */
  async getPoll(id: string, withOptions: boolean): Promise<Poll> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching poll");
    }
    const poll = await response.json();
    if (withOptions) {
      const options = await optionsService.getOptionsForPoll(poll._id);
      poll.options = options ?? [];
    }
    return poll;
  },
  /**
   * Get all polls
   */
  async getPolls(): Promise<Poll[]> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}`);
    if (!response.ok) {
      throw new Error("Error fetching polls");
    }
    return response.json();
  },

  /**
   * Delete a poll
   */
  async deletePoll(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${POLL_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting poll");
    }
    return response.json();
  },
};
