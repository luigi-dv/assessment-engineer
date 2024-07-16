export type Vote = {
  _id: string;
  poll_id: string;
  option_id: string;
  created_by: string;
};

export class VoteClass implements Vote {
  _id: string;
  poll_id: string;
  option_id: string;
  created_by: string;

  constructor(
    _id: string,
    poll_id: string,
    option_id: string,
    created_by: string,
  );
}
