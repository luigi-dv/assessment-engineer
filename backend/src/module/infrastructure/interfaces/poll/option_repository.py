from fastapi import HTTPException
from pymongo.errors import DuplicateKeyError
from src.module.domain.entities.poll.option_entity import Option
from src.module.infrastructure.persistence.db_context import DatabaseContext
from src.module.domain.repositories.poll.option_repository import IOptionRepository


class OptionRepository(IOptionRepository):
    """
    Option repository implementation
    """
    def __init__(self):
        self.context = DatabaseContext()
        self.database = self.context.get_database()
        self.collection = self.database.options

    async def get_by_poll(self, poll_id) -> list[Option]:
        cursor = self.collection.find({"poll_id": poll_id})
        documents = list(cursor)

        if documents:
            return [Option(**doc) for doc in documents]
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def find_by_id(self, option_id: str) -> Option:
        document = self.collection.find_one({"_id": option_id})
        if document:
            return Option(**document)
        else:
            raise HTTPException(
                status_code=404,
                detail="Not found",
            )

    async def create(self, option: Option) -> Option:
        try:
            result = self.collection.insert_one(option.dict(by_alias=True))
            if result.acknowledged:
                option.id = result.inserted_id
                return option
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Operation Failed",
                )
        except DuplicateKeyError as e:
            raise HTTPException(
                status_code=400,
                detail="Duplicate key error creating",
            )

    async def delete(self, option_id: str) -> bool:
        try:
            result = self.collection.delete_one({"_id": option_id})
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
