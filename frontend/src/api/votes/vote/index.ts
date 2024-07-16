import { Vote } from "src/api/votes/types";
import { v4 as uuidv4 } from "uuid";

export class VoteClass implements Vote {
  _id: string;
  poll_id: string;
  option_id: string;
  created_by: string;

  constructor(poll_id: string, option_id: string, createdBy: string) {
    this._id = uuidv4();
    this.poll_id = poll_id;
    this.option_id = option_id;
    this.created_by = createdBy;
  }
}
