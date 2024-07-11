#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from abc import ABC, abstractmethod
from typing import List

from src.module.domain.entities.poll.option_entity import Option


class IOptionRepository(ABC):

    @abstractmethod
    async def find_by_id(self, option_id: str) -> Option:
        """
        Find a poll by its id
        :param option_id: The Poll id
        :return: The Option
        """
        pass

    @abstractmethod
    async def get_by_poll(self, option_id: str) -> List[Option]:
        """
        Find options by they poll id
        :param option_id: The Poll id
        :return: The Option
        """
        pass

    @abstractmethod
    async def create(self, option: Option) -> Option:
        """
        Create a new poll
        :param option: The poll to create
        :return: The created Option
        """
        pass

    @abstractmethod
    async def delete(self, option_id: str) -> bool:
        """
        Delete an option
        :param option_id: The option id
        :return:
        """
        pass
