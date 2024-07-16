import { API_URL, OPTION_ENDPOINT } from "src/constants/endpoints";
import { Option } from "src/api/options/types";

export const optionsService = {
  /**
   * Function to get all options
   *
   * @returns The options
   */
  async getOptions(): Promise<Option[]> {
    const response = await fetch(`${API_URL}/${OPTION_ENDPOINT}`);
    return response.json();
  },

  async getOptionsForPoll(pollId: string): Promise<Option[]> {
    const response = await fetch(
      `${API_URL}/${OPTION_ENDPOINT}/poll/${pollId}`,
    );
    if (!response.ok) {
      throw new Error("Error fetching options for poll");
    }

    return response.json();
  },

  /**
   * Function to add an option
   *
   * @param option The option to add
   * @returns The added option
   */
  async addOption(option: string): Promise<Option> {
    const response = await fetch(`${API_URL}/${OPTION_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    });
    if (!response.ok) {
      throw new Error("Error adding option");
    }
    return response.json();
  },

  /**
   * Function to delete an option
   *
   * @param id The id of the option to delete
   * @returns The deleted option
   */
  async deleteOption(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${OPTION_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting option");
    }
    return await response.json();
  },
};
