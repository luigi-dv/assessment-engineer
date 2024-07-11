from typing import List
from fastapi import HTTPException
from src.module.domain.entities.poll.option_entity import Option
from src.module.domain.repositories.poll.option_repository import IOptionRepository
from src.module.infrastructure.interfaces.poll.option_repository import OptionRepository


class OptionService():

    def __init__(self):
        self.option_repository = OptionRepository()

    async def get_options_by_poll(self, poll_id: str) -> List[Option]:
        return await self.option_repository.get_by_poll(poll_id)

    async def get_option_by_id(self, option_id: str) -> Option:
        return await self.option_repository.find_by_id(option_id)

    async def create_option(self, option: Option) -> Option:
        return await self.option_repository.create(option)

    async def delete_option(self, option_id: str) -> bool:
        return await self.option_repository.delete(option_id)
