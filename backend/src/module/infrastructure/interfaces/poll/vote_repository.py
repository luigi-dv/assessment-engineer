from uuid import UUID
from fastapi import HTTPException
from pymongo.errors import DuplicateKeyError
from src.module.domain.entities.poll.vote_entity import Vote
from src.module.infrastructure.persistence.db_context import DatabaseContext
from src.module.domain.repositories.poll.option_repository import IOptionRepository


class VoteRepository(IOptionRepository):
    """
    Vote repository implementation
    """
    def __init__(self):
        self.context = DatabaseContext()
        self.database = self.context.get_database()
        self.collection = self.database.votes

    async def get_by_poll(self, poll_id) -> list[Vote]:
        cursor = self.collection.find({"poll_id": poll_id})
        documents = list(cursor)

        if documents:
            return [Vote(**doc) for doc in documents]
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def find_by_id(self, vote_id: str) -> Vote:
        document = self.collection.find_one({"_id": UUID(vote_id)})
        if document:
            return Vote(**document)
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def create(self, vote: Vote) -> Vote:
        try:
            result = self.collection.insert_one(vote.dict(by_alias=True))
            if result.acknowledged:
                vote.id = result.inserted_id
                return vote
            else:
                raise HTTPException(
                    status_code=500,
                    detail="Operation Failed",
                )
        except DuplicateKeyError as e:
            raise HTTPException(
                status_code=400,
                detail="Duplicate key error creating",
            )

    async def delete(self, vote_id: str) -> bool:
        try:
            result = self.collection.delete_one({"_id": vote_id})
            if result.deleted_count > 0:
                return True
            else:
                raise HTTPException(
                    status_code=404, detail="Not found or not deleted"
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Operation Failed",
            )
