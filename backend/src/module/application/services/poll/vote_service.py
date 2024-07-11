from typing import List
from src.module.domain.entities.poll.vote_entity import Vote
from src.module.infrastructure.interfaces.poll.vote_repository import VoteRepository


class VoteService:

    def __init__(self):
        self.vote_repository = VoteRepository()

    async def get_votes_by_poll(self, poll_id: str) -> List[Vote]:
        return await self.vote_repository.get_by_poll(poll_id)

    async def get_vote_by_id(self, vote_id: str) -> Vote:
        return await self.vote_repository.find_by_id(vote_id)

    async def create_vote(self, vote: Vote) -> Vote:
        return await self.vote_repository.create(vote)

    async def delete_vote(self, vote_id: str) -> bool:
        return await self.vote_repository.delete(vote_id)
