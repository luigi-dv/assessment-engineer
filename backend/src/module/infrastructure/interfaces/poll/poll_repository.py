from fastapi import HTTPException
from pymongo.errors import DuplicateKeyError
from src.module.domain.entities.poll.poll_entity import Poll
from src.module.infrastructure.persistence.db_context import DatabaseContext
from src.module.domain.repositories.poll.poll_repository import IPollRepository


class PollRepository(IPollRepository):
    """
    Poll repository implementation
    """
    def __init__(self):
        self.context = DatabaseContext()
        self.database = self.context.get_database()
        self.collection = self.database.polls

    async def get_all(self) -> list[Poll]:
        document = self.collection.find()
        if document:
            return [Poll(**doc) for doc in document]
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def find_by_id(self, poll_id: str) -> Poll:
        document = self.collection.find_one({"_id": poll_id})
        if document:
            return Poll(**document)
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def create(self, poll: Poll) -> Poll:
        try:
            result = self.collection.insert_one(poll.dict(by_alias=True))
            if result.acknowledged:
                poll.id = result.inserted_id
                return poll
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

    async def delete(self, poll_id: str) -> bool:
        try:
            result = self.collection.delete_one({"_id": poll_id})
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
